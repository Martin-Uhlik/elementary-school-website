import { saveEvent } from "../actions";
import CalendarEventForm from "@/components/admin/CalendarEventForm";
import PageTitle from "@/components/admin/PageTitle";
import { requireUser } from "@/lib/auth/session";
import { getSchoolYears } from "@/lib/content/misc";

const NewEventPage = async ({ searchParams }: PageProps<"/auth/prubeh-roku/nova">) => {
  await requireUser({ section: "kalendar" });
  const years = (await getSchoolYears()).map((y) => y.schoolYear);
  // a new school year (?rok=2028/2029) starts with its first day of school
  const rok = (await searchParams).rok;
  const schoolYear = typeof rok === "string" && /^\d{4}\/\d{4}$/.test(rok) ? rok : undefined;
  const isNew = schoolYear && !years.includes(schoolYear);
  return (
    <>
      <PageTitle back="/auth/prubeh-roku" backLabel="Průběh školního roku">
        {isNew ? `Nový školní rok ${schoolYear}: první událost` : "Nová událost"}
      </PageTitle>
      <section className="admin-card">
        <CalendarEventForm
          action={saveEvent.bind(null, undefined)}
          years={isNew ? [...years, schoolYear] : years}
          schoolYear={schoolYear}
          newYear={Boolean(isNew)}
        />
      </section>
    </>
  );
};

export default NewEventPage;
