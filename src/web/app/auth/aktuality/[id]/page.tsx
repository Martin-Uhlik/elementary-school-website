import Link from "next/link";
import { notFound } from "next/navigation";
import { saveNews } from "../actions";
import NewsForm from "@/components/admin/NewsForm";
import { isoDate } from "@/lib/content/misc";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

const EditNewsPage = async ({ params }: PageProps<"/auth/aktuality/[id]">) => {
  await requireUser();
  const news = await prisma.news.findUnique({ where: { id: (await params).id } });
  if (!news) notFound();
  return (
    <>
      <Link href="/auth/aktuality">← Aktuality</Link>
      <h1>Upravit aktualitu</h1>
      <section className="admin-card">
        <NewsForm action={saveNews.bind(null, news.id)} news={{ ...news, date: isoDate(news.date) }} />
      </section>
    </>
  );
};

export default EditNewsPage;
