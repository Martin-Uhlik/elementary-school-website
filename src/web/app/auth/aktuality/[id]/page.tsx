import { notFound } from "next/navigation";
import { saveNews } from "../actions";
import NewsForm from "@/components/admin/NewsForm";
import { isoDate } from "@/lib/content/misc";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

const EditNewsPage = async ({ params }: PageProps<"/auth/aktuality/[id]">) => {
  await requireUser({ section: "aktuality" });
  const news = await prisma.news.findUnique({ where: { id: (await params).id } });
  if (!news) notFound();
  return (
    <>
      <PageTitle back="/auth/aktuality" backLabel="Aktuality">
        Upravit aktualitu
      </PageTitle>
      <section className="admin-card">
        <NewsForm action={saveNews.bind(null, news.id)} news={{ ...news, date: isoDate(news.date) }} />
      </section>
    </>
  );
};

export default EditNewsPage;
