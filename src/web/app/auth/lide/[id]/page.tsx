import { notFound } from "next/navigation";
import { savePerson } from "../actions";
import PersonForm from "@/components/admin/PersonForm";
import { getLabels } from "@/lib/admin/people";
import { requireUser } from "@/lib/auth/session";
import { personName } from "@/lib/content/format";
import { eq } from "drizzle-orm";
import { people } from "@zsmp/db/schema";
import { toPerson, withPhones } from "@/lib/content/people";
import { database } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

const EditPersonPage = async ({ params }: PageProps<"/auth/lide/[id]">) => {
  await requireUser({ section: "lide" });
  const row = await database.query.people.findFirst({ where: eq(people.id, (await params).id), with: withPhones });
  if (!row) notFound();
  const person = toPerson(row);
  return (
    <>
      <PageTitle back="/auth/lide" backLabel="Lidé a kontakty">
        {personName(person)}
      </PageTitle>
      <section className="admin-card">
        <PersonForm action={savePerson.bind(null, person.id)} person={person} labels={await getLabels()} />
      </section>
    </>
  );
};

export default EditPersonPage;
