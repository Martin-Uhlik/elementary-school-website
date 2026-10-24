import { notFound } from "next/navigation";
import { saveEvent } from "../actions";
import CalendarEventForm from "@/components/admin/CalendarEventForm";
import PageTitle from "@/components/admin/PageTitle";
import { requireUser } from "@/lib/auth/session";
import { getSchoolYears } from "@/lib/content/misc";

const EditEventPage = async ({ params }: PageProps<"/auth/prubeh-roku/[id]">) => {
  await requireUser({ section: "kalendar" });
  const { id } = await params;
  const years = await getSchoolYears();
  const event = years.flatMap((y) => y.events).find((e) => e.id === id);
  if (!event) notFound();
  return (
    <>
      <PageTitle
        back={`/auth/prubeh-roku?rok=${encodeURIComponent(event.schoolYear)}`}
        backLabel="Průběh školního roku"
      >
        Upravit událost
      </PageTitle>
      <section className="admin-card">
        <CalendarEventForm
          action={saveEvent.bind(null, event.id)}
          event={event}
          years={years.map((y) => y.schoolYear)}
        />
      </section>
    </>
  );
};

export default EditEventPage;
