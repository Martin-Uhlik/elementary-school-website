import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { freeFileName, GALLERY_DIR, resolveInside, safeFileName, THUMBNAIL_FOLDER } from "@/lib/media";

const ALLOWED = /\.(jpe?g|png|webp)$/i;
// the shorter side of a preview
const THUMBNAIL_SIZE = 256;

export const galleryDir = (folder: string) => {
  const dir = resolveInside(GALLERY_DIR, [folder]);
  if (!dir) throw new Error(`Neplatná složka galerie: ${folder}`);
  return dir;
};

// Saves an uploaded photo like the old Python script did: the full photo in galerie/<folder>/ and a preview
// with its shorter side 256 px in galerie/<folder>/thumbnails/ under the same name. Photos taken on a phone
// are turned upright first (EXIF orientation), so the size the gallery reports matches what is shown.
export const savePhoto = async (folder: string, file: File) => {
  const name = safeFileName(file.name);
  if (!ALLOWED.test(name)) throw new Error(`${file.name}: nahrát lze jen fotky JPG, PNG nebo WebP.`);
  const dir = galleryDir(folder);
  await fs.mkdir(path.join(dir, THUMBNAIL_FOLDER), { recursive: true });

  let photo: Buffer = Buffer.from(await file.arrayBuffer());
  const meta = await sharp(photo)
    .metadata()
    .catch(() => null);
  if (!meta) throw new Error(`${file.name}: soubor není čitelný obrázek.`);
  if (meta.orientation && meta.orientation > 1) {
    const upright = sharp(photo).rotate();
    photo = await (meta.format === "jpeg" ? upright.jpeg({ quality: 90 }) : upright).toBuffer();
  }

  const finalName = await freeFileName(dir, name);
  await fs.writeFile(path.join(dir, finalName), photo);
  await sharp(photo)
    .resize({ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE, fit: "outside", withoutEnlargement: true })
    .toFile(path.join(dir, THUMBNAIL_FOLDER, finalName));
  return finalName;
};

export const deletePhoto = async (folder: string, file: string) => {
  const dir = galleryDir(folder);
  const photo = resolveInside(dir, [file]);
  if (!photo || path.dirname(photo) !== dir) return;
  await fs.rm(photo, { force: true });
  await fs.rm(path.join(dir, THUMBNAIL_FOLDER, file), { force: true });
};
