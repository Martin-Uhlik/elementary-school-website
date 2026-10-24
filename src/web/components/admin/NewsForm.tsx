import ActionForm, { type ActionState } from "./ActionForm";
import FileField from "./FileField";

type News = { title: string; date: string; text: string; href: string | null; published: boolean };

// The form for a new or an existing news item
const NewsForm = ({ action, news }: { action: (data: FormData) => Promise<ActionState>; news?: News }) => (
  <ActionForm action={action} submitLabel="Uložit">
    <div className="row g-3">
      <div className="col-md-8">
        <label htmlFor="title" className="form-label">
          Nadpis
        </label>
        <input id="title" name="title" className="form-control" defaultValue={news?.title} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="date" className="form-label">
          Datum
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="form-control"
          defaultValue={news?.date ?? new Date().toISOString().slice(0, 10)}
          required
        />
      </div>
    </div>
    <div>
      <label htmlFor="text" className="form-label">
        Text
      </label>
      <textarea
        id="text"
        name="text"
        className="form-control"
        rows={6}
        defaultValue={news?.text}
        aria-describedby="text-help"
      />
      <div id="text-help" className="form-text">
        Prázdný řádek začne nový odstavec.
      </div>
    </div>
    <FileField href={news?.href} />
    <div className="form-check">
      <input
        id="published"
        name="published"
        type="checkbox"
        className="form-check-input"
        defaultChecked={news?.published ?? true}
      />
      <label htmlFor="published" className="form-check-label">
        Zobrazit na webu
      </label>
    </div>
  </ActionForm>
);

export default NewsForm;
