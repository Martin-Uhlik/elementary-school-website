import { saveEvent } from "../actions";
import CalendarEventForm from "@/components/admin/CalendarEventForm";
import PageTitle from "@/components/admin/PageTitle";
import { requireUser } from "@/lib/auth/session";
import { getSchoolYears } from "@/lib/content/misc";

const NewEventPage = async () => {
  await requireUser({ section: "kalendar" });
  const years = (await getSchoolYears()).map((y) => y.schoolYear);
  return (
    <>
      <PageTitle back="/auth/prubeh-roku" backLabel="Průběh školního roku">
        Nová událost
      </PageTitle>
      <section className="admin-card">
        <CalendarEventForm action={saveEvent.bind(null, undefined)} years={years} />
      </section>
    </>
  );
};

export default NewEventPage;
