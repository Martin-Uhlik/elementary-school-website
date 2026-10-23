export type LinkType = "page" | "external" | "video" | "pdf" | "word" | "excel" | "powerpoint" | "scratch" | "file";

const BY_EXTENSION: Record<string, LinkType> = {
  pdf: "pdf",
  doc: "word",
  docx: "word",
  odt: "word",
  rtf: "word",
  xls: "excel",
  xlsx: "excel",
  ods: "excel",
  ppt: "powerpoint",
  pptx: "powerpoint",
  sb3: "scratch",
  mp4: "video",
  webm: "video",
  zip: "file",
  pem: "file",
};

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  page: "",
  external: "externí odkaz",
  video: "Video",
  pdf: "Dokument PDF",
  word: "Dokument Word",
  excel: "Tabulka Excel",
  powerpoint: "Prezentace PowerPoint",
  scratch: "Projekt Scratch",
  file: "Soubor ke stažení",
};

// The type is not stored, it is read from the address: a file extension wins, then http(s) means another site
export const getLinkType = (href: string): LinkType => {
  const path = href.split(/[?#]/)[0];
  const extension = path.includes(".") ? path.slice(path.lastIndexOf(".") + 1).toLowerCase() : "";
  return BY_EXTENSION[extension] ?? (/^https?:\/\//.test(href) ? "external" : "page");
};
