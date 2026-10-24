// A link field with an upload next to it: a chosen file is saved to dokument/ and replaces the address
const FileField = ({ href, label = "Odkaz nebo dokument" }: { href?: string | null; label?: string }) => (
  <fieldset className="row g-3">
    <legend className="form-label fs-6 mb-0">{label}</legend>
    <div className="col-md-6">
      <label htmlFor="file" className="form-label small text-body-secondary">
        Nahrát soubor (PDF, Word, Excel…)
      </label>
      <input id="file" name="file" type="file" className="form-control" />
    </div>
    <div className="col-md-6">
      <label htmlFor="href" className="form-label small text-body-secondary">
        nebo adresa
      </label>
      <input
        id="href"
        name="href"
        className="form-control"
        defaultValue={href ?? ""}
        placeholder="https://… nebo /dokument/…"
      />
    </div>
    {href && (
      <div className="col-12 form-text mt-1">
        Teď:{" "}
        <a href={href} target="_blank" rel="noreferrer">
          {href}
        </a>
      </div>
    )}
  </fieldset>
);

export default FileField;
