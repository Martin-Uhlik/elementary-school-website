import PageTitle from "@/components/admin/PageTitle";

// notFound() in the admin (an item that was deleted or a wrong id), shown inside the admin layout to signed-in users only.
// Visitors outside ADMIN_ALLOWED_IPS never get here: proxy.ts sends them the site's own 404 (app/not-found.tsx).
const AuthNotFound = () => (
  <>
    <PageTitle back="/auth" backLabel="Přehled">
      Nenalezeno
    </PageTitle>
    <section className="admin-card">
      <p className="mb-0">Tato položka neexistuje, možná ji mezitím někdo smazal.</p>
    </section>
  </>
);

export default AuthNotFound;
