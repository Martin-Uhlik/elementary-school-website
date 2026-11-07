import ActionForm, { type ActionState } from "./ActionForm";
import { MONTHS, type ThemeDates } from "@/lib/background";

type Theme = ThemeDates & { name: string; src: string; active: boolean };

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

// Day and month selects for one end of the range; empty for the default theme
const DateSelects = ({
  id,
  label,
  day,
  month,
}: {
  id: string;
  label: string;
  day: number | null;
  month: number | null;
}) => (
  <fieldset className="col-sm-6">
    <legend className="form-label fs-6 mb-2">{label}</legend>
    <div className="admin-date">
      <label htmlFor={`${id}Day`} className="visually-hidden">
        {label}: den
      </label>
      <select id={`${id}Day`} name={`${id}Day`} className="form-select admin-date__day" defaultValue={day ?? ""}>
        <option value="">den</option>
        {DAYS.map((d) => (
          <option key={d} value={d}>
            {d}.
          </option>
        ))}
      </select>
      <label htmlFor={`${id}Month`} className="visually-hidden">
        {label}: měsíc
      </label>
      <select id={`${id}Month`} name={`${id}Month`} className="form-select" defaultValue={month ?? ""}>
        <option value="">měsíc</option>
        {MONTHS.map((m, i) => (
          <option key={m} value={i + 1}>
            {m}
          </option>
        ))}
      </select>
    </div>
  </fieldset>
);

// The form for a new or an existing background theme
const BackgroundForm = ({ action, theme }: { action: (data: FormData) => Promise<ActionState>; theme?: Theme }) => (
  <ActionForm action={action} submitLabel="Uložit">
    <div>
      <label htmlFor="name" className="form-label">
        Název
      </label>
      <input id="name" name="name" className="form-control" defaultValue={theme?.name} required />
    </div>
    <div>
      <label htmlFor="file" className="form-label">
        {theme ? "Nahrát jiný obrázek" : "Obrázek"}
      </label>
      <input
        id="file"
        name="file"
        type="file"
        accept=".svg,.png,.webp,image/svg+xml,image/png,image/webp"
        className="form-control"
        required={!theme}
        aria-describedby="file-help"
      />
      <div id="file-help" className="form-text">
        Nejlépe SVG, případně PNG nebo WebP s průhledným pozadím. Na webu se roztáhne na celou šířku v poměru 1818 × 703
        a otočí se vzhůru nohama, jako v náhledu.
      </div>
    </div>
    {theme && (
      <figure className="mb-0">
        <img
          src={theme.src}
          alt={`Současný obrázek: ${theme.name}`}
          className="admin-background-preview admin-background-preview--form"
        />
        <figcaption className="form-text">Teď: {theme.src}</figcaption>
      </figure>
    )}
    <div className="row g-3">
      <DateSelects id="start" label="Od" day={theme?.startDay ?? null} month={theme?.startMonth ?? null} />
      <DateSelects id="end" label="Do" day={theme?.endDay ?? null} month={theme?.endMonth ?? null} />
      <div className="col-12 form-text mt-1">
        Období platí každý rok a může přecházet přes Nový rok (např. 1. prosince – 31. ledna). Když nevyplníte nic, bude
        to výchozí pozadí pro dny, na které žádné jiné nepřipadá. Když se dvě období překrývají, zobrazí se to kratší.
      </div>
    </div>
    <div className="form-check">
      <input
        id="active"
        name="active"
        type="checkbox"
        className="form-check-input"
        defaultChecked={theme?.active ?? true}
      />
      <label htmlFor="active" className="form-check-label">
        Zobrazovat na webu
      </label>
    </div>
  </ActionForm>
);

export default BackgroundForm;
