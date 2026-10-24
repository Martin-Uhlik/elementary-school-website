import Link from "next/link";
import { LuTrash2 } from "react-icons/lu";
import { createUser, deleteUser } from "./actions";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PasswordFields from "@/components/admin/PasswordFields";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

const UsersPage = async () => {
  const me = await requireUser();
  const users = await prisma.user.findMany({ orderBy: { username: "asc" } });
  return (
    <>
      <div className="admin-title">
        <h1>Uživatelé</h1>
        <Link href="/auth/heslo" className="btn btn-outline-primary">
          Změnit moje heslo
        </Link>
      </div>
      <section className="admin-card">
        <table className="table admin-table mb-0">
          <caption className="visually-hidden">Uživatelé, kteří se mohou přihlásit</caption>
          <thead>
            <tr>
              <th scope="col">Jméno</th>
              <th scope="col">Stav</th>
              <th scope="col" className="actions">
                <span className="visually-hidden">Akce</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.mustChangePassword ? "čeká na změnu hesla" : "aktivní"}</td>
                <td className="actions">
                  {user.id !== me.id && (
                    <ConfirmButton
                      action={deleteUser.bind(null, user.id)}
                      question={`Opravdu smazat uživatele ${user.username}?`}
                      label={`Smazat ${user.username}`}
                    >
                      <LuTrash2 aria-hidden="true" />
                    </ConfirmButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="admin-card" aria-labelledby="new-user">
        <h2 id="new-user" className="h5">
          Přidat uživatele
        </h2>
        <ActionForm action={createUser} submitLabel="Přidat">
          <div>
            <label htmlFor="username" className="form-label">
              Přihlašovací jméno
            </label>
            <input id="username" name="username" className="form-control" autoComplete="off" required />
          </div>
          <PasswordFields label="Dočasné heslo" />
        </ActionForm>
      </section>
    </>
  );
};

export default UsersPage;
