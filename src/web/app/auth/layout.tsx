import type { Metadata } from "next";
import { logout } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";
import { requireUser } from "@/lib/auth/session";
import "../admin.css";

export const metadata: Metadata = {
  title: "Správa webu",
  robots: { index: false, follow: false },
};

// The admin area: its own header instead of the site's menu; only for signed-in users
const AuthLayout = async ({ children }: LayoutProps<"/auth">) => {
  const user = await requireUser({ passwordPage: true });
  return (
    <>
      <a className="visually-hidden-focusable skip-link" href="#obsah">
        Přeskočit na obsah
      </a>
      <header className="admin-header navbar navbar-dark">
        <div className="container-fluid gap-3">
          <span className="navbar-brand">Správa webu</span>
          {!user.mustChangePassword && <AdminNav />}
          <div className="d-flex align-items-center gap-2 ms-auto">
            <a href="/" className="btn btn-sm btn-outline-light" target="_blank" rel="noreferrer">
              Zobrazit web
            </a>
            <form action={logout}>
              <button type="submit" className="btn btn-sm btn-light">
                Odhlásit ({user.username})
              </button>
            </form>
          </div>
        </div>
      </header>
      <main id="obsah" className="admin-main">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
