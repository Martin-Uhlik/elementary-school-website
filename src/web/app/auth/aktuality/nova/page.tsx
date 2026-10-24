import { saveNews } from "../actions";
import NewsForm from "@/components/admin/NewsForm";
import { requireUser } from "@/lib/auth/session";
import PageTitle from "@/components/admin/PageTitle";

const NewNewsPage = async () => {
  await requireUser({ section: "aktuality" });
  return (
    <>
      <PageTitle back="/auth/aktuality" backLabel="Aktuality">
        Nová aktualita
      </PageTitle>
      <section className="admin-card">
        <NewsForm action={saveNews.bind(null, undefined)} />
      </section>
    </>
  );
};

export default NewNewsPage;
