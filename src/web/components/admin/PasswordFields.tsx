// The "new password" and "again" inputs used when changing a password and adding a user
type Props = { label?: string; required?: boolean; help?: string };

const PasswordFields = ({ label = "Nové heslo", required = true, help = "Aspoň 8 znaků." }: Props) => (
  <div className="row g-3">
    <div className="col-sm-6">
      <label htmlFor="password" className="form-label">
        {label}
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="form-control"
        autoComplete="new-password"
        data-1p-ignore
        data-lpignore="true"
        minLength={8}
        required={required}
        aria-describedby="password-help"
      />
      <div id="password-help" className="form-text">
        {help}
      </div>
    </div>
    <div className="col-sm-6">
      <label htmlFor="again" className="form-label">
        Heslo znovu
      </label>
      <input
        id="again"
        name="again"
        type="password"
        className="form-control"
        autoComplete="new-password"
        data-1p-ignore
        data-lpignore="true"
        required={required}
      />
    </div>
  </div>
);

export default PasswordFields;
