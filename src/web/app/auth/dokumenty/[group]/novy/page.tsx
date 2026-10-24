import Link from "next/link";
import { notFound } from "next/navigation";
import { saveLink } from "../../actions";
import LinkForm from "@/components/admin/LinkForm";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

const NewLinkPage = async ({ params }: PageProps<"/auth/dokumenty/[group]/novy">) => {
  await requireUser();
  const group = await prisma.linkGroup.findUnique({ where: { id: (await params).group } });
  if (!group) notFound();
  return (
    <>
      <Link href={`/auth/dokumenty/${group.id}`}>← Zpět na seznam</Link>
      <h1>Nový dokument nebo odkaz</h1>
      <section className="admin-card">
        <LinkForm action={saveLink.bind(null, group.id, undefined)} />
      </section>
    </>
  );
};

export default NewLinkPage;
