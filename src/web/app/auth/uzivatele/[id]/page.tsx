import { notFound } from "next/navigation";
import { updateUser } from "../actions";
import ActionForm from "@/components/admin/ActionForm";
import PasswordFields from "@/components/admin/PasswordFields";
import UserFields from "@/components/admin/UserFields";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

const UserPage = async ({ params }: PageProps<"/auth/uzivatele/[id]">) => {
  await requireUser({ section: "admin" });
  const user = await prisma.user.findUnique({ where: { id: Number((await params).id) || 0 } });
  if (!user) notFound();
  return (
    <>
      <PageTitle back="/auth/uzivatele" backLabel="Uživatelé">
        {user.username}
      </PageTitle>
      <section className="admin-card">
        <ActionForm action={updateUser.bind(null, user.id)} submitLabel="Uložit">
          <UserFields user={user} />
          <PasswordFields
            label="Nové dočasné heslo (nepovinné)"
            required={false}
            help="Vyplňte jen pro nové heslo: uživatel se jím přihlásí a pak si nastaví vlastní."
          />
        </ActionForm>
      </section>
    </>
  );
};

export default UserPage;
