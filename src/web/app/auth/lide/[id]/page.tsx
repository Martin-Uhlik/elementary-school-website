import Link from "next/link";
import { notFound } from "next/navigation";
import { savePerson } from "../actions";
import PersonForm from "@/components/admin/PersonForm";
import { getLabels } from "@/lib/admin/people";
import { requireUser } from "@/lib/auth/session";
import { personName } from "@/lib/content/format";
import { personInclude, toPerson } from "@/lib/content/people";
import { prisma } from "@/lib/db";

const EditPersonPage = async ({ params }: PageProps<"/auth/lide/[id]">) => {
  await requireUser();
  const row = await prisma.person.findUnique({ where: { id: (await params).id }, include: personInclude });
  if (!row) notFound();
  const person = toPerson(row);
  return (
    <>
      <Link href="/auth/lide">← Lidé a kontakty</Link>
      <h1>{personName(person)}</h1>
      <section className="admin-card">
        <PersonForm action={savePerson.bind(null, person.id)} person={person} labels={await getLabels()} />
      </section>
    </>
  );
};

export default EditPersonPage;
