import { changePassword, changeUsername } from "./actions";
import ActionForm from "@/components/admin/ActionForm";
import PasswordFields from "@/components/admin/PasswordFields";
import { requireUser } from "@/lib/auth/session";
import PageTitle from "@/components/admin/PageTitle";

const CurrentPassword = ({ id }: { id: string }) => (
  <div>
    <label htmlFor={id} className="form-label">
      Současné heslo
    </label>
    <input
      id={id}
      name="current"
      type="password"
      className="form-control"
      autoComplete="off"
      data-1p-ignore
      data-lpignore="true"
      required
    />
  </div>
);

// Every user can change their own sign-in name and password here (the real name is set by an admin)
const AccountPage = async () => {
  const user = await requireUser({ passwordPage: true });
  return (
    <>
      <PageTitle back="/auth" backLabel="Přehled">
        Můj účet
      </PageTitle>
      {user.mustChangePassword && (
        <div className="alert alert-warning mb-0" role="status">
          Přihlásili jste se výchozím nebo dočasným heslem. Než budete pokračovat, nastavte si vlastní.
        </div>
      )}
      <section className="admin-card" aria-labelledby="password-heading">
        <h2 id="password-heading" className="h5">
          Změna hesla
        </h2>
        <ActionForm action={changePassword} submitLabel="Změnit heslo">
          <CurrentPassword id="current" />
          <PasswordFields />
        </ActionForm>
      </section>
      {!user.mustChangePassword && (
        <section className="admin-card" aria-labelledby="username-heading">
          <h2 id="username-heading" className="h5">
            Přihlašovací jméno
          </h2>
          <ActionForm action={changeUsername} submitLabel="Změnit jméno">
            <div>
              <label htmlFor="username" className="form-label">
                Nové přihlašovací jméno
              </label>
              <input
                id="username"
                name="username"
                className="form-control"
                defaultValue={user.username}
                autoComplete="off"
                aria-describedby="username-help"
                required
              />
              <div id="username-help" className="form-text">
                3–40 znaků: písmena bez diakritiky, číslice, tečka, pomlčka.
              </div>
            </div>
            <CurrentPassword id="current-for-username" />
          </ActionForm>
        </section>
      )}
    </>
  );
};

export default AccountPage;
