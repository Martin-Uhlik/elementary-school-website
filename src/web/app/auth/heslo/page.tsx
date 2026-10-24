import { changePassword } from "../uzivatele/actions";
import ActionForm from "@/components/admin/ActionForm";
import PasswordFields from "@/components/admin/PasswordFields";
import { requireUser } from "@/lib/auth/session";

const PasswordPage = async () => {
  const user = await requireUser({ passwordPage: true });
  return (
    <>
      <h1>Změna hesla</h1>
      {user.mustChangePassword && (
        <div className="alert alert-warning mb-0" role="status">
          Přihlásili jste se výchozím nebo dočasným heslem. Než budete pokračovat, nastavte si vlastní.
        </div>
      )}
      <section className="admin-card">
        <ActionForm action={changePassword} submitLabel="Změnit heslo">
          <div>
            <label htmlFor="current" className="form-label">
              Současné heslo
            </label>
            <input
              id="current"
              name="current"
              type="password"
              className="form-control"
              autoComplete="current-password"
              required
            />
          </div>
          <PasswordFields />
        </ActionForm>
      </section>
    </>
  );
};

export default PasswordPage;
