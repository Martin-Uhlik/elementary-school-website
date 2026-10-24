import { notFound } from "next/navigation";
import { saveLink } from "../../actions";
import LinkForm from "@/components/admin/LinkForm";
import { requireUser } from "@/lib/auth/session";
import { toLink } from "@/lib/content/links";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

const EditLinkPage = async ({ params }: PageProps<"/auth/dokumenty/[group]/[link]">) => {
  await requireUser({ section: "dokumenty" });
  const { group, link: id } = await params;
  const link = await prisma.link.findFirst({ where: { id, groupId: group } });
  if (!link) notFound();
  return (
    <>
      <PageTitle back={`/auth/dokumenty/${group}`} backLabel="seznam">
        Upravit: {link.title}
      </PageTitle>
      <section className="admin-card">
        <LinkForm action={saveLink.bind(null, group, link.id)} link={toLink(link)} />
      </section>
    </>
  );
};

export default EditLinkPage;
