import Link from "next/link";
import { savePerson } from "../actions";
import PersonForm from "@/components/admin/PersonForm";
import { getLabels } from "@/lib/admin/people";
import { requireUser } from "@/lib/auth/session";

const NewPersonPage = async ({ searchParams }: PageProps<"/auth/lide/novy">) => {
  await requireUser();
  const section = (await searchParams).sekce;
  return (
    <>
      <Link href="/auth/lide">← Lidé a kontakty</Link>
      <h1>Nová osoba</h1>
      <section className="admin-card">
        <PersonForm
          action={savePerson.bind(null, undefined)}
          labels={await getLabels()}
          label={typeof section === "string" ? section : undefined}
        />
      </section>
    </>
  );
};

export default NewPersonPage;
