import type { Metadata } from "next";
import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";
import PersonCard from "@/components/content/PersonCard";
import { getPeople } from "@/lib/content/people";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/organizace/druzina",
  "Družina",
  "Školní družina při ZŠ Moravský Písek: dokumenty, vychovatelky a výsledky dotazníku pro rodiče.",
);

// Ported from html/organizace/druzina.html
const OrganizaceDruzinaPage = async () => {
  const educators = await getPeople("Družina");
  const druzinaDokumenty = await getLinkGroup("organizace-druzina-dokumenty");
  const dotaznik = await getLinkGroup("organizace-druzina-dotaznik");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Družina</h1>
            <div className="article__body">
              <h2 className="article__heading">Dokumenty</h2>
              <LinkList links={druzinaDokumenty.links} />
            </div>

            <div className="article__body">
              <h2 className="article__heading">Personální podmínky</h2>
              <div className="persons">
                {educators.map((person) => (
                  <PersonCard key={person.id} person={person} variant="short" />
                ))}
              </div>
            </div>

            <div className="article__body">
              <h2 className="article__heading">Dotazník</h2>
              <p>
                Vážení rodiče, děkujeme Vám za ochotu vyplnit dotazník. Zpět do našich rukou se dostalo 30 dotazníků,
                připomínkami se budeme dále zabývat. Výsledky naleznete v níže uvedeném dokumentu.
              </p>
              <LinkList links={dotaznik.links} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizaceDruzinaPage;
