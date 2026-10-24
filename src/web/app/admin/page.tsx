import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { login } from "./actions";
import ActionForm from "@/components/admin/ActionForm";
import { getCurrentUser } from "@/lib/auth/session";
import "../admin.css";

// The sign-in page: not linked from the site, hidden from search engines (also in robots.txt)
export const metadata: Metadata = {
  title: "Přihlášení | Správa webu",
  robots: { index: false, follow: false },
};

const AdminLoginPage = async () => {
  if (await getCurrentUser()) redirect("/auth");
  return (
    <main id="obsah" className="admin-login">
      <div className="admin-card admin-login__card">
        <h1 className="h4 mb-0">Správa webu</h1>
        <ActionForm action={login} submitLabel="Přihlásit">
          <div>
            <label htmlFor="username" className="form-label">
              Jméno
            </label>
            <input id="username" name="username" className="form-control" autoComplete="username" required />
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
              autoComplete="current-password"
              required
            />
          </div>
        </ActionForm>
      </div>
    </main>
  );
};

export default AdminLoginPage;
