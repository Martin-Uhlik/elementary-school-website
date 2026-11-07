import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

// Photos (galerie/), documents (dokument/) and background pictures (pozadi/) live outside the app in MEDIA_DIR, so uploads from /auth survive
// rebuilds and are served right away. Docker mounts the host folder at /app/media; on a dev machine it is media/
// in the repository root.
const MEDIA_DIR = process.env.MEDIA_DIR ?? path.resolve(process.cwd(), "..", "..", "media");

export const GALLERY_DIR = path.join(MEDIA_DIR, "galerie");
export const DOCUMENT_DIR = path.join(MEDIA_DIR, "dokument");
export const BACKGROUND_DIR = path.join(MEDIA_DIR, "pozadi");

// previews made by the upload sit in this subfolder under the same name
export const THUMBNAIL_FOLDER = "thumbnails";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  odt: "application/vnd.oasis.opendocument.text",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  rtf: "application/rtf",
  txt: "text/plain; charset=utf-8",
  zip: "application/zip",
  mp4: "video/mp4",
};

// A path inside root built from URL segments, or null when it would leave root
export const resolveInside = (root: string, segments: string[]) => {
  const target = path.resolve(root, ...segments);
  return target.startsWith(root + path.sep) ? target : null;
};

// A safe file name: no folders, no characters that need escaping in a URL; keeps the extension
export const safeFileName = (name: string) => {
  const base = path.basename(name).normalize("NFD").replace(/[̀-ͯ]/g, "");
  const cleaned = base.replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^[._]+/, "");
  return cleaned || "soubor";
};

// A name that is not taken yet in dir: name.pdf, name-2.pdf, name-3.pdf ...
export const freeFileName = async (dir: string, name: string) => {
  const { name: stem, ext } = path.parse(name);
  for (let i = 1; ; i++) {
    const candidate = i === 1 ? name : `${stem}-${i}${ext}`;
    try {
      await fs.access(path.join(dir, candidate));
    } catch {
      return candidate;
    }
  }
};

// Sends a file from the media folder, or 404; browsers revalidate with If-Modified-Since
export const serveFile = async (request: Request, root: string, segments: string[]) => {
  const file = resolveInside(
    root,
    segments.map((s) => decodeURIComponent(s)),
  );
  const stat = file ? await fs.stat(file).catch(() => null) : null;
  if (!file || !stat?.isFile()) return new Response("Soubor nebyl nalezen.", { status: 404 });

  const lastModified = new Date(Math.floor(stat.mtimeMs / 1000) * 1000);
  const since = request.headers.get("if-modified-since");
  const headers = {
    "Content-Type": CONTENT_TYPES[path.extname(file).slice(1).toLowerCase()] ?? "application/octet-stream",
    "Last-Modified": lastModified.toUTCString(),
    "Cache-Control": "public, max-age=600",
    "X-Content-Type-Options": "nosniff",
    // an SVG opened on its own could run scripts on this site's address; this keeps it a plain picture
    ...(file.toLowerCase().endsWith(".svg") && {
      "Content-Security-Policy": "default-src 'none'; img-src data:; style-src 'unsafe-inline'; sandbox",
    }),
  };
  if (since && new Date(since) >= lastModified) return new Response(null, { status: 304, headers });
  const body = Readable.toWeb(createReadStream(file)) as ReadableStream;
  return new Response(body, { headers: { ...headers, "Content-Length": String(stat.size) } });
};
