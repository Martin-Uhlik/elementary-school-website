import { saveTheme } from "../actions";
import BackgroundForm from "@/components/admin/BackgroundForm";
import PageTitle from "@/components/admin/PageTitle";
import { requireUser } from "@/lib/auth/session";

const NewBackgroundPage = async () => {
  await requireUser({ section: "pozadi" });
  return (
    <>
      <PageTitle back="/auth/pozadi" backLabel="Pozadí">
        Nové pozadí
      </PageTitle>
      <section className="admin-card">
        <BackgroundForm action={saveTheme.bind(null, undefined)} />
      </section>
    </>
  );
};

export default NewBackgroundPage;
