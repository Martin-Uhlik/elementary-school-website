import Link from "next/link";
import { saveNews } from "../actions";
import NewsForm from "@/components/admin/NewsForm";
import { requireUser } from "@/lib/auth/session";

const NewNewsPage = async () => {
  await requireUser();
  return (
    <>
      <Link href="/auth/aktuality">← Aktuality</Link>
      <h1>Nová aktualita</h1>
      <section className="admin-card">
        <NewsForm action={saveNews.bind(null, undefined)} />
      </section>
    </>
  );
};

export default NewNewsPage;
