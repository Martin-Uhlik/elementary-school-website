import ActionForm, { type ActionState } from "./ActionForm";
import type { Gallery } from "@/lib/content/types";

export const UNIT_LABELS = { zs: "Základní škola", ms: "Mateřská škola", druzina: "Družina" } as const;

type Props = { action: (data: FormData) => Promise<ActionState>; gallery?: Gallery; unit?: string };

// A new gallery asks for the date (it names the folder); an existing one shows its year and date text
const GalleryForm = ({ action, gallery, unit }: Props) => (
  <ActionForm action={action} submitLabel={gallery ? "Uložit" : "Vytvořit galerii"}>
    <div className="row g-3">
      <div className="col-md-8">
        <label htmlFor="title" className="form-label">
          Název
        </label>
        <input id="title" name="title" className="form-control" defaultValue={gallery?.title} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="unit" className="form-label">
          Patří k
        </label>
        <select id="unit" name="unit" className="form-select" defaultValue={gallery?.unit ?? unit ?? "zs"}>
          {Object.entries(UNIT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {gallery ? (
        <div className="col-md-4">
          <label htmlFor="year" className="form-label">
            Rok v archivu
          </label>
          <input id="year" name="year" type="number" className="form-control" defaultValue={gallery.year} required />
        </div>
      ) : (
        <div className="col-md-4">
          <label htmlFor="date" className="form-label">
            Datum akce
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="form-control"
            defaultValue={new Date().toISOString().slice(0, 10)}
            required
          />
        </div>
      )}
      <div className="col-md-8">
        <label htmlFor="dateText" className="form-label">
          Datum, jak se zobrazí na webu {gallery ? "" : "(nepovinné, např. 18.–23. 1. 2026)"}
        </label>
        <input id="dateText" name="dateText" className="form-control" defaultValue={gallery?.dateText} />
      </div>
      <div className="col-12">
        <label htmlFor="url" className="form-label">
          Odkaz na video místo fotek (nepovinné, např. YouTube)
        </label>
        <input id="url" name="url" type="url" className="form-control" defaultValue={gallery?.url} />
      </div>
    </div>
  </ActionForm>
);

export default GalleryForm;
