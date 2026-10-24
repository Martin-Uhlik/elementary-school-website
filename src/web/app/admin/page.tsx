import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { login } from "./actions";
import ActionForm from "@/components/admin/ActionForm";
import { authConfig } from "@/lib/auth/config";
import { getCurrentUser } from "@/lib/auth/session";
import "../admin.css";

// The sign-in page: not linked from the site, hidden from search engines (also in robots.txt)
export const metadata: Metadata = {
  title: "Přihlášení | Správa webu",
  robots: { index: false, follow: false },
};

const AdminLoginPage = async ({ searchParams }: PageProps<"/admin">) => {
  if (await getCurrentUser()) redirect("/auth");
  const timedOut = (await searchParams).odhlaseno === "neaktivita";
  return (
    <main id="obsah" className="admin-login">
      <div className="admin-card admin-login__card">
        <h1 className="h4 mb-0">Správa webu</h1>
        {timedOut && (
          <div className="alert alert-info mb-0" role="status">
            Byli jste odhlášeni po {authConfig.inactivityMinutes} minutách nečinnosti.
          </div>
        )}
        <ActionForm action={login} submitLabel="Přihlásit">
          <div>
            <label htmlFor="username" className="form-label">
              Jméno
            </label>
            <input
              id="username"
              name="username"
              className="form-control"
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Heslo
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              required
            />
          </div>
        </ActionForm>
      </div>
    </main>
  );
};

export default AdminLoginPage;
