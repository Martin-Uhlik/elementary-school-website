// The "new password" and "again" inputs used when changing a password and adding a user
const PasswordFields = ({ label = "Nové heslo" }: { label?: string }) => (
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
        minLength={8}
        required
        aria-describedby="password-help"
      />
      <div id="password-help" className="form-text">
        Aspoň 8 znaků.
      </div>
    </div>
    <div className="col-sm-6">
      <label htmlFor="again" className="form-label">
        Heslo znovu
      </label>
      <input id="again" name="again" type="password" className="form-control" autoComplete="new-password" required />
    </div>
  </div>
);

export default PasswordFields;
