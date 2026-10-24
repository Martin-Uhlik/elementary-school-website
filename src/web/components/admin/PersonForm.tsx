import ActionForm, { type ActionState } from "./ActionForm";
import PhoneFields from "./PhoneFields";
import type { Person } from "@/lib/content/types";

type Props = { action: (data: FormData) => Promise<ActionState>; person?: Person; labels: string[]; label?: string };

const field = (name: keyof Person, label: string, person?: Person, type = "text", className = "col-md-6") => (
  <div className={className}>
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input id={name} name={name} type={type} className="form-control" defaultValue={String(person?.[name] ?? "")} />
  </div>
);

// A member of staff or a contact without a person; label preselects the section for a new entry
const PersonForm = ({ action, person, labels, label }: Props) => {
  const checked = person?.labels ?? (label ? [label] : []);
  return (
    <ActionForm action={action} submitLabel="Uložit">
      <div className="row g-3">
        {field("titleBefore", "Titul před jménem", person, "text", "col-md-2")}
        {field("firstName", "Jméno", person, "text", "col-md-4")}
        {field("lastName", "Příjmení", person, "text", "col-md-4")}
        {field("titleAfter", "Titul za jménem", person, "text", "col-md-2")}
        {field("position", "Funkce (např. třídní učitelka 2. třídy)", person)}
        {field("email", "E-mail", person, "email")}
        {field("name", "Název kontaktu bez osoby (např. Knihovna) – jinak nechte prázdné", person, "text", "col-12")}
      </div>
      <PhoneFields phones={person?.phones ?? []} />
      <div>
        <label htmlFor="description" className="form-label">
          Popis (předměty, kvalifikace…), každá položka na nový řádek
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          rows={3}
          defaultValue={person?.description?.join("\n")}
        />
      </div>
      <fieldset>
        <legend className="form-label fs-6">Kde se zobrazuje (sekce na stránkách)</legend>
        <div className="row row-cols-1 row-cols-md-2 g-1">
          {labels.map((l, i) => (
            <div key={l} className="col form-check">
              <input
                id={`label-${i}`}
                name="labels"
                type="checkbox"
                value={l}
                className="form-check-input"
                defaultChecked={checked.includes(l)}
              />
              <label htmlFor={`label-${i}`} className="form-check-label">
                {l}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </ActionForm>
  );
};

export default PersonForm;
