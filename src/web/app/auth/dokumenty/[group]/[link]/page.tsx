import Link from "next/link";
import { notFound } from "next/navigation";
import { saveLink } from "../../actions";
import LinkForm from "@/components/admin/LinkForm";
import { requireUser } from "@/lib/auth/session";
import { toLink } from "@/lib/content/links";
import { prisma } from "@/lib/db";

const EditLinkPage = async ({ params }: PageProps<"/auth/dokumenty/[group]/[link]">) => {
  await requireUser();
  const { group, link: id } = await params;
  const link = await prisma.link.findFirst({ where: { id, groupId: group } });
  if (!link) notFound();
  return (
    <>
      <Link href={`/auth/dokumenty/${group}`}>← Zpět na seznam</Link>
      <h1>Upravit: {link.title}</h1>
      <section className="admin-card">
        <LinkForm action={saveLink.bind(null, group, link.id)} link={toLink(link)} />
      </section>
    </>
  );
};

export default EditLinkPage;
