import Link from "next/link";
import { LuLockOpen, LuPencil, LuTrash2 } from "react-icons/lu";
import { createUser, deleteUser, unlockUser } from "./actions";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PasswordFields from "@/components/admin/PasswordFields";
import UserFields from "@/components/admin/UserFields";
import { formatTime } from "@/lib/admin/time";
import { PERMISSION_LABELS } from "@/lib/auth/sections";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

// Only for admins: who can sign in, their real names and what they may edit
const UsersPage = async () => {
  const me = await requireUser({ section: "admin" });
  const users = await prisma.user.findMany({ orderBy: { username: "asc" } });
  const now = new Date();
  return (
    <>
      <PageTitle back="/auth" backLabel="Přehled">
        Uživatelé
      </PageTitle>
      <section className="admin-card">
        <table className="table admin-table mb-0">
          <caption className="visually-hidden">Uživatelé, kteří se mohou přihlásit</caption>
          <thead>
            <tr>
              <th scope="col">Jméno</th>
              <th scope="col">Skutečné jméno</th>
              <th scope="col">Přístup</th>
              <th scope="col">Stav</th>
              <th scope="col" className="actions">
                <span className="visually-hidden">Akce</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const locked = user.lockedUntil && user.lockedUntil > now;
              return (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.realName}</td>
                  <td>
                    {user.permissions.includes("admin")
                      ? "správce, vše"
                      : user.permissions.map((p) => PERMISSION_LABELS[p]).join(", ") || "žádný"}
                  </td>
                  <td>
                    {locked
                      ? `zablokovaný do ${formatTime(user.lockedUntil!)}`
                      : user.mustChangePassword
                        ? "čeká na změnu hesla"
                        : "aktivní"}
                  </td>
                  <td className="actions">
                    {locked && (
                      <form action={unlockUser.bind(null, user.id)} className="d-inline">
                        <button
                          type="submit"
                          className="btn btn-sm btn-outline-secondary me-1"
                          aria-label={`Odblokovat ${user.username}`}
                          title="Odblokovat"
                        >
                          <LuLockOpen aria-hidden="true" />
                        </button>
                      </form>
                    )}
                    <Link
                      href={`/auth/uzivatele/${user.id}`}
                      className="btn btn-sm btn-outline-primary me-1"
                      aria-label={`Upravit ${user.username}`}
                      title="Upravit"
                    >
                      <LuPencil aria-hidden="true" />
                    </Link>
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
              );
            })}
          </tbody>
        </table>
      </section>
      <section className="admin-card" aria-labelledby="new-user">
        <h2 id="new-user" className="h5">
          Přidat uživatele
        </h2>
        <ActionForm action={createUser} submitLabel="Přidat">
          <UserFields />
          <PasswordFields label="Dočasné heslo" />
        </ActionForm>
      </section>
    </>
  );
};

export default UsersPage;
