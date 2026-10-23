import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";
import PersonCard from "@/components/content/PersonCard";
import { getPeople } from "@/lib/content/people";

// Ported from html/organizace/druzina.html
const OrganizaceDruzinaPage = async () => {
  const educators = await getPeople("Družina");
  const druzinaDokumenty = await getLinkGroup("organizace-druzina-dokumenty");
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Družina</h1>
            <div className="article__body">
              <h2>Dokumenty</h2>
              <LinkList links={druzinaDokumenty.links} />
            </div>

            <div className="article__body">
              <h2>Personální podmínky</h2>
              <p>
                V provozu máme dvě oddělení, které vedou dvě pedagogické pracovnice (vychovatelky). Vychovatelky splňují
                kvalifikační podmínky. V průběhu zaměstnání rozšiřují své profesní znalosti a dovednosti v oblasti práce
                s dětmi. Navštěvují semináře akreditované Ministerstvem školství. Spolupracují s pedagogickými
                pracovníky I. stupně ZŠ (1.-5. roč.). Využívají spoluúčasti rodičů při zajišťování pomůcek pro ŠD.
              </p>
            </div>

            <div className="article__body">
              <h2>Podmínky přijímání žáků (dětí)</h2>
              <p>
                Provoz je přednostně určen pro žáky I. stupně. Maximální počet je 45 žáků. Přijímáni jsou na začátku
                školního roku vyplněním zápisního lístku. Zápisní lístky vedeme v evidenci. Přednostně jsou přijímány
                děti zaměstnaných rodičů.
              </p>
            </div>

            <div className="article__body">
              <h2>Úplata</h2>
              <p>
                Pro školní rok je stanovena na částku 100,- Kč/měsíc za celodenní pobyt a 50,- Kč/měsíc za polodenní
                pobyt.
              </p>
            </div>

            <div className="article__body">
              <h2>Podmínky průběhu a ukončování vzdělání</h2>
              <p>Provozní doba ŠD je od 11:30 do 16:00 hodin., ranní družina 6:30-7:50 hod.</p>
              <p>
                Týdenní činnost a vzdělávání je rozdělena na oblasti: výtvarná výchova, tělesně pohybová výchova,
                hudebně pohybová výchova, pracovní činnosti, přírodovědná činnost.
              </p>
              <p>
                Mimo těchto pěti výchovně vzdělávacích oblastí je do denního programu zařazena odpočinková činnost a
                příprava na vyučování. Činnosti jsou plněny v určeném režimu, ale děti nejsou do činností násilně
                nuceny. Děti navštěvují během roku i jiné zájmové kroužky vedené pedagogy ZŠ nebo učiteli LŠU.
                Uvolňování ze ŠD do těchto kroužků je dětem umožněno na základě oznámení rodičů. Přechody žáků do
                zájmových kroužků jsou povoleny přímo rodiči písemnou formou nebo zajištěny plnoletou osobou.
              </p>
              <p>Ukončení docházky žáků musí být písemně oznámeno vychovatelce školní družiny.</p>
            </div>

            <div className="persons">
              {educators.map((person) => (
                <PersonCard key={person.id} person={person} variant="short" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizaceDruzinaPage;
