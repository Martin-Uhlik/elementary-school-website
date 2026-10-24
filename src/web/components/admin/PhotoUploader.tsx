"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";

// Uploads the chosen (or dropped) photos one by one, so a big batch never hits a request size limit,
// and shows how far it got. The server makes the previews.
const PhotoUploader = ({ galleryId }: { galleryId: string }) => {
  const router = useRouter();
  const [over, setOver] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const upload = async (files: File[]) => {
    const photos = files.filter((f) => f.type.startsWith("image/") || /\.(jpe?g|png|webp)$/i.test(f.name));
    if (photos.length === 0) return;
    setErrors([]);
    setProgress({ done: 0, total: photos.length });
    for (const [i, photo] of photos.entries()) {
      const body = new FormData();
      body.append("photo", photo);
      try {
        const response = await fetch(`/auth/galerie/${encodeURIComponent(galleryId)}/fotky`, { method: "POST", body });
        if (!response.ok) {
          const { error } = await response.json().catch(() => ({ error: undefined }));
          setErrors((list) => [...list, error ?? `${photo.name}: nahrání selhalo (${response.status}).`]);
        }
      } catch {
        setErrors((list) => [...list, `${photo.name}: nahrání selhalo, zkontrolujte připojení.`]);
      }
      setProgress({ done: i + 1, total: photos.length });
    }
    router.refresh();
  };

  const busy = progress !== null && progress.done < progress.total;
  return (
    // dropping files is an extra for mouse users; the "Vybrat fotky" button is the keyboard way
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`admin-dropzone${over ? " admin-dropzone--over" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setOver(false);
        if (!busy) upload([...event.dataTransfer.files]);
      }}
    >
      <p className="mb-2">Přetáhněte fotky sem, nebo</p>
      <label className={`btn btn-primary${busy ? " disabled" : ""}`}>
        <LuUpload aria-hidden="true" /> Vybrat fotky
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="visually-hidden"
          disabled={busy}
          onChange={(event) => {
            upload([...(event.target.files ?? [])]);
            event.target.value = "";
          }}
        />
      </label>
      {progress && (
        <div className="mt-3" role="status">
          <progress className="w-100" max={progress.total} value={progress.done} aria-label="Průběh nahrávání" />
          <div className="small">
            {busy
              ? `Nahrávám ${progress.done + 1} z ${progress.total}…`
              : `Hotovo: ${progress.total} fotek zpracováno.`}
          </div>
        </div>
      )}
      {errors.length > 0 && (
        <ul className="alert alert-danger text-start mt-3 mb-0" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhotoUploader;
