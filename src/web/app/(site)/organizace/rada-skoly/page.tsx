import type { Metadata } from "next";
import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";
import { personName } from "@/lib/content/format";
import { getPeople } from "@/lib/content/people";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/organizace/rada-skoly",
  "Rada školy",
  "Školská rada při ZŠ a MŠ Moravský Písek: členové za školu, rodiče a zřizovatele, zápisy a dokumenty.",
);

// Ported from html/organizace/rada-skoly.html
const OrganizaceRadaSkolyPage = async () => {
  const documents = await getLinkGroup("organizace-rada-skoly");
  const groups = await Promise.all(
    ["školy", "rodičů", "zřizovatele"].map(async (group) => ({
      group,
      members: await getPeople(`Rada školy: zástupci ${group}`),
    })),
  );
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Rada školy</h1>
            <LinkList links={documents.links} />
            <span>
              Školská rada se zřizuje podle zákona č.561/2004 Sb. při základních, středních a vyšších odborných školách.
            </span>
            <ul>
              <li>
                školská rada je orgán školy umožňující zákonným zástupcům nezletilých žáků, pedagogickým pracovníkům
                školy a zřizovateli a dalším osobám podílet se na správě školy
              </li>
              <li>
                školskou radu zřizuje zřizovatel, který zároveň stanoví počet jejích členů a vydá její volební řád
              </li>
              <li>školská rada zasedá nejméně 2x ročně</li>
              <li>se vyjadřuje k návrhům školních vzdělávacích programů a k jejich následnému uskutečňování</li>
              <li>schvaluje výroční zprávu o činnosti školy</li>
              <li>schvaluje školní řád a navrhuje jejich změny</li>
              <li>schvaluje pravidla pro hodnocení výsledků vzdělávání žáků</li>
              <li>podílí se na zpracování koncepčních záměrů rozvoje školy</li>
              <li>
                projednává návrh rozpočtu na další rok, vyjadřuje se k rozboru hospodaření a navrhuje opatření ke
                zlepšení hospodaření
              </li>
              <li>projednává inspekční zprávy, protokoly o kontrole a výsledky šetření České školní inspekce</li>
              <li>
                projednává podněty, oznámení a stížnosti týkající se zejména vzdělávání a poskytování školských služeb a
                podává podněty, oznámení řediteli školy, zřizovateli, orgánům vykonávajícím státní správu ve školství a
                dalším orgánům státní správy
              </li>
              <li>uděluje předchozí souhlas se jmenováním ředitele školy podle § 166 odst. 10 písm. b)</li>
              <li>uděluje předchozí souhlas s kombinovanou výukou podle § 25a ve škole</li>
              <li>
                odvolává souhlas s kombinovanou výukou podle § 25a ve škole; kombinovaná výuka končí ke dni určenému
                školskou radou
              </li>
            </ul>
            <span>
              Třetinu členů školské rady jmenuje zřizovatel, třetinu volí zákonní zástupci nezletilých žáků a třetinu
              volí pedagogičtí pracovníci školy. Členem školské rady nemůže být ředitel školy.
            </span>
            <table className="data-table">
              <caption>Členové školské rady</caption>
              <thead>
                <tr>
                  <th scope="col">Zástupci</th>
                  <th scope="col">Členové</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(({ group, members }) => (
                  <tr key={group}>
                    <th scope="row">{group}</th>
                    <td>{members.map(personName).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizaceRadaSkolyPage;
