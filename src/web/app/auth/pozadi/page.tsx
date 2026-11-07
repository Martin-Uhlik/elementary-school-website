import Link from "next/link";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { deleteTheme } from "./actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageTitle from "@/components/admin/PageTitle";
import { requireUser } from "@/lib/auth/session";
import { formatThemeDates, hasDates, pickTheme, pragueToday } from "@/lib/background";
import { prisma } from "@/lib/db";

// The seasonal backgrounds: dated ones in calendar order from January, the default last
const BackgroundsAdminPage = async () => {
  await requireUser({ section: "pozadi" });
  const themes = (await prisma.backgroundTheme.findMany({ orderBy: { createdAt: "asc" } })).sort(
    (a, b) =>
      (hasDates(a) ? a.startMonth! * 100 + a.startDay! : 9999) -
      (hasDates(b) ? b.startMonth! * 100 + b.startDay! : 9999),
  );
  const { day, month } = pragueToday();
  const current = pickTheme(
    themes.filter((theme) => theme.active),
    day,
    month,
  );
  return (
    <>
      <div className="admin-title">
        <PageTitle back="/auth" backLabel="Přehled">
          Pozadí
        </PageTitle>
        <Link href="/auth/pozadi/nova" className="btn btn-primary">
          Nové pozadí
        </Link>
      </div>
      <p className="mb-0">
        Obrázek za horní částí všech stránek kromě hlavní. Každé pozadí se zobrazuje ve svém období každý rok, výchozí
        ve dnech, na které žádné jiné nepřipadá. Změna se na webu projeví do pěti minut.
      </p>
      {themes.length === 0 ? (
        <p className="admin-card mb-0">Zatím tu nejsou žádná pozadí, stránky budou bez obrázku.</p>
      ) : (
        <ul className="admin-backgrounds list-unstyled mb-0">
          {themes.map((theme) => (
            <li key={theme.id} className="admin-card admin-backgrounds__item">
              <img src={theme.src} alt="" className="admin-background-preview" loading="lazy" />
              <div className="admin-backgrounds__info">
                <h2 className="h5 mb-1">{theme.name}</h2>
                <p className="small text-body-secondary mb-0">{formatThemeDates(theme)}</p>
                {theme.id === current?.id && <span className="badge text-bg-success mt-2">Teď na webu</span>}
                {!theme.active && <span className="badge text-bg-secondary mt-2">Vypnuté</span>}
              </div>
              <div className="admin-backgrounds__actions">
                <Link
                  href={`/auth/pozadi/${theme.id}`}
                  className="btn btn-sm btn-outline-primary me-2"
                  aria-label={`Upravit ${theme.name}`}
                  title="Upravit"
                >
                  <LuPencil aria-hidden="true" />
                </Link>
                <ConfirmButton
                  action={deleteTheme.bind(null, theme.id)}
                  question={`Opravdu smazat pozadí „${theme.name}“?`}
                  label={`Smazat ${theme.name}`}
                >
                  <LuTrash2 aria-hidden="true" />
                </ConfirmButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BackgroundsAdminPage;
