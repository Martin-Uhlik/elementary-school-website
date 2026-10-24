import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { DOCUMENT_DIR, freeFileName, safeFileName } from "@/lib/media";

const ALLOWED = /\.(pdf|docx?|xlsx?|pptx?|odt|ods|odp|rtf|txt|zip|jpe?g|png)$/i;

// Saves an uploaded file to dokument/ under a URL-safe name that is not taken yet; returns its address.
// An empty file input gives undefined, a forbidden type throws with a message for the form.
export const saveDocument = async (file: FormDataEntryValue | null) => {
  if (!(file instanceof File) || file.size === 0) return undefined;
  const name = safeFileName(file.name);
  if (!ALLOWED.test(name))
    throw new Error("Tento typ souboru nelze nahrát (povolené: PDF, Word, Excel, PowerPoint, obrázky, ZIP).");
  await fs.mkdir(DOCUMENT_DIR, { recursive: true });
  const finalName = await freeFileName(DOCUMENT_DIR, name);
  await fs.writeFile(path.join(DOCUMENT_DIR, finalName), Buffer.from(await file.arrayBuffer()));
  return `/dokument/${finalName}`;
};
