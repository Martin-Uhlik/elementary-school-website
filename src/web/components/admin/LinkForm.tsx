import ActionForm, { type ActionState } from "./ActionForm";
import FileField from "./FileField";
import type { Link } from "@/lib/content/types";

type Props = { action: (data: FormData) => Promise<ActionState>; link?: Link };

// A document or a link in a list; for a new one also where it goes
const LinkForm = ({ action, link }: Props) => (
  <ActionForm action={action} submitLabel="Uložit">
    <div>
      <label htmlFor="title" className="form-label">
        Název
      </label>
      <input id="title" name="title" className="form-control" defaultValue={link?.title} required />
    </div>
    <FileField href={link?.href} label="Dokument nebo odkaz (prázdné = jen text)" />
    <div>
      <label htmlFor="description" className="form-label">
        Popis pod názvem, každý řádek zvlášť (nepovinné)
      </label>
      <textarea
        id="description"
        name="description"
        className="form-control"
        rows={2}
        defaultValue={link?.description?.join("\n")}
      />
    </div>
    <div>
      <label htmlFor="details" className="form-label">
        Delší poznámka v bublině „i“ (nepovinné)
      </label>
      <textarea id="details" name="details" className="form-control" rows={2} defaultValue={link?.details} />
    </div>
    {!link && (
      <fieldset>
        <legend className="form-label fs-6">Umístění v seznamu</legend>
        <div className="form-check form-check-inline">
          <input id="position-top" name="position" type="radio" value="top" className="form-check-input" />
          <label htmlFor="position-top" className="form-check-label">
            na začátek
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            id="position-end"
            name="position"
            type="radio"
            value="end"
            className="form-check-input"
            defaultChecked
          />
          <label htmlFor="position-end" className="form-check-label">
            na konec
          </label>
        </div>
      </fieldset>
    )}
  </ActionForm>
);

export default LinkForm;
