import { notFound } from "next/navigation";
import { saveTheme } from "../actions";
import BackgroundForm from "@/components/admin/BackgroundForm";
import PageTitle from "@/components/admin/PageTitle";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

const EditBackgroundPage = async ({ params }: PageProps<"/auth/pozadi/[id]">) => {
  await requireUser({ section: "pozadi" });
  const theme = await prisma.backgroundTheme.findUnique({ where: { id: (await params).id } });
  if (!theme) notFound();
  return (
    <>
      <PageTitle back="/auth/pozadi" backLabel="Pozadí">
        Upravit pozadí
      </PageTitle>
      <section className="admin-card">
        <BackgroundForm action={saveTheme.bind(null, theme.id)} theme={theme} />
      </section>
    </>
  );
};

export default EditBackgroundPage;
