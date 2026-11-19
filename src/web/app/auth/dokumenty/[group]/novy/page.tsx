import { notFound } from "next/navigation";
import { saveLink } from "../../actions";
import LinkForm from "@/components/admin/LinkForm";
import { requireUser } from "@/lib/auth/session";
import { eq } from "drizzle-orm";
import { linkGroups } from "@zsmp/db/schema";
import { database } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

const NewLinkPage = async ({ params }: PageProps<"/auth/dokumenty/[group]/novy">) => {
  await requireUser({ section: "dokumenty" });
  const [group] = await database
    .select()
    .from(linkGroups)
    .where(eq(linkGroups.id, (await params).group));
  if (!group) notFound();
  return (
    <>
      <PageTitle back={`/auth/dokumenty/${group.id}`} backLabel="seznam">
        Nový dokument nebo odkaz
      </PageTitle>
      <section className="admin-card">
        <LinkForm action={saveLink.bind(null, group.id, undefined)} />
      </section>
    </>
  );
};

export default NewLinkPage;
