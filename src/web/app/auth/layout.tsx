import type { Metadata } from "next";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import { logout } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";
import SessionTimer from "@/components/admin/SessionTimer";
import { authConfig } from "@/lib/auth/config";
import { requireUser } from "@/lib/auth/session";
import "../admin.css";

export const metadata: Metadata = {
  title: "Správa webu",
  robots: { index: false, follow: false },
};

// The admin area: its own header in the site's blue instead of the site's menu; only for signed-in users
const AuthLayout = async ({ children }: LayoutProps<"/auth">) => {
  const user = await requireUser({ passwordPage: true });
  return (
    <>
      <a className="visually-hidden-focusable skip-link" href="#obsah">
        Přeskočit na obsah
      </a>
      <header className="admin-header">
        <nav className="navbar navbar-dark bg-primary" aria-label="Menu správy webu">
          <div className="container-fluid column-gap-4 row-gap-2">
            <Link className="navbar-brand" href="/auth">
              Správa webu
            </Link>
            {!user.mustChangePassword && <AdminNav permissions={user.permissions} />}
            <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
              <SessionTimer minutes={authConfig.inactivityMinutes} />
              <Link href="/auth/ucet" className="btn btn-sm btn-outline-light" title="Můj účet: jméno a heslo">
                <LuUserRound aria-hidden="true" className="me-1" />
                {user.username}
              </Link>
              <a href="/" className="btn btn-sm btn-outline-light" target="_blank" rel="noreferrer">
                Zobrazit web
              </a>
              <form action={logout}>
                <button type="submit" className="btn btn-sm btn-light">
                  Odhlásit
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <main id="obsah" className="admin-main">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
