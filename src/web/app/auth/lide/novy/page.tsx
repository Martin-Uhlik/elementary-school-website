import { savePerson } from "../actions";
import PersonForm from "@/components/admin/PersonForm";
import { getLabels } from "@/lib/admin/people";
import { requireUser } from "@/lib/auth/session";
import PageTitle from "@/components/admin/PageTitle";

const NewPersonPage = async ({ searchParams }: PageProps<"/auth/lide/novy">) => {
  await requireUser({ section: "lide" });
  const section = (await searchParams).sekce;
  return (
    <>
      <PageTitle back="/auth/lide" backLabel="Lidé a kontakty">
        Nová osoba
      </PageTitle>
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
