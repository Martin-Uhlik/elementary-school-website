import LinkList from "@/components/content/LinkList";
import ZigZagPath from "@/components/content/ZigZagPath";
import { getLinkGroup } from "@/lib/content/links";
import PersonCard from "@/components/content/PersonCard";
import { getPeople } from "@/lib/content/people";

// Ported from html/hala.html
const HalaPage = async () => {
  const manager = await getPeople("Hala");
  const hala = await getLinkGroup("hala");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Pronájem tělocvičny a venkovního víceúčelového hřiště</h1>
            <div className="zig-zag">
              <ZigZagPath />
              <div className="zig-zag__row zig-zag__row--left">
                <div className="zig-zag__text">
                  {manager.map((person) => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      variant="short"
                      note="Kontaktujte prosím správce haly telefonicky nebo e-mailem."
                    />
                  ))}
                </div>
                <img className="zig-zag__photo" src="/data/images/hala/hala_1.jpg" alt="Fotografie venkovního hřiště" />
              </div>
              <div className="zig-zag__row zig-zag__row--right">
                <img className="zig-zag__photo" src="/data/images/hala/hala_2.jpg" alt="Fotografie tělocvičny" />
                <div className="zig-zag__text">
                  <LinkList links={hala.links} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">
              Provozní řád sportovní haly - tělocvičny a venkovního víceúčelového hřiště při ZŠ a MŠ Moravský Písek
            </h1>
            <div className="article__body">
              <h2 className="article__heading">Základní ustanovení – vymezení účelu</h2>
              <p>
                Majitelem – zřizovatelem sportovní haly – tělocvičny a venkovního víceúčelového hřiště (dále sportovních
                zařízení) je Obec Moravský Písek. Tato sportovní zařízení slouží především pro potřeby pravidelné výuky
                žáků, dále pro místní sportovní oddíly a rovněž pro širokou veřejnost, v souladu s tímto provozním
                řádem.
              </p>
              <p>
                Provozovatelem sportovních zařízení je Základní škola a Mateřská škola, Moravský Písek. Provozovatel –
                zastoupený ředitelkou školy Mgr. Ivanou Uhlíkovou, určí zodpovědného správce sportovních zařízení, který
                plní povinnosti provozovatele dané obecně platnými předpisy pro provoz sportovních zařízení a povinnosti
                dané tímto provozním řádem a dbá na jejich plnění i ze strany uživatelů.
              </p>
              <p>
                Všichni uživatelé sportovních zařízení jsou povinni řídit se ustanoveními tohoto provozního řádu, pokyny
                správce a také pokyny oprávněných zástupců majitele a provozovatele, pokud to okamžité okolnosti
                vyžadují. O trvalých změnách tohoto provozního řádu, které provedou ve vzájemné dohodě majitel a
                provozovatel s ohledem na aktuální potřeby, budou uživatelé včas vyrozuměni.
              </p>
              <p>Všechny obecné a jiné související zákonné normy zůstávají nedotčeny.</p>
            </div>
            <div className="article__body">
              <h2 className="article__heading">Další ustanovení – vymezení podmínek užívání</h2>
              <p>
                S provozovatelem lze dojednat pravidelné nebo občasné využití sportovních zařízení, a to za dále
                stanovených podmínek a za poplatek dle platného ceníku.
              </p>
              <p>Sportovní zařízení jsou v provozu v pondělí – neděli, a to následovně:</p>
              <ol>
                <li>
                  pondělí – pátek (v době pravidelného vyučování)
                  <br /> 7.00 hod – 16.00 hod. pouze pro potřeby školy; 16.00 hod. – 23.00 hod. pro veřejnost
                </li>
                <li>
                  sobota a neděle
                  <br /> 8.00 hod. – 23.00 hod. pro veřejnost
                  <br />
                </li>
                <li>
                  pondělí – neděle (v době prázdnin - letní prázdniny, pololetní aj.)
                  <br /> 8.00 hod. – 23.00 hod. pro veřejnost.
                </li>
                <li>
                  Sjednaný časový rozvrh lze měnit v průběhu roku na návrh uživatele pouze po dohodě s provozovatelem.
                  Požadavek na změnu je nutno nahlásit a předem projednat. Pokud tak uživatel neučiní, nedostaví se ve
                  sjednaném termínu dle rozvrhu a ani neuhradí příslušnou částku dle ujednání, ztrácí po uplynutí
                  jednoho týdne nárok na určený časový termín a může být z rozpisu vyloučen.
                </li>
                <li>
                  Tzv. sezónní změna sjednaného rozpisu se provádí vždy k 30. 6. příslušného roku. Při sestavování
                  časového rozvrhu mají přednost domácí uživatelé, pokud včas uplatní své požadavky. Ukončení využití
                  sportovních zařízení před tímto termínem je uživatel povinen oznámit provozovateli jeden měsíc před
                  zamýšleným ukončením, nové a další využití pro příští období lze s provozovatelem sjednat již před
                  tímto datem dle zde stanovených podmínek.
                </li>
                <li>
                  Odchylky od podmínek využívání sportovních zařízení může povolit písemnou formou pouze ředitelka školy
                  nebo starosta obce. Správce eviduje tyto udělené výjimky a dokládá je při vyúčtování řádně očíslovány.
                </li>
                <li>
                  Vstup uživatelské veřejnosti do sportovních zařízení je možný pouze se svolením a na pokyn správce, a
                  to v předepsané a vhodné sportovní obuvi a v čistém sportovním oblečení. Správce nepovolí vstup osobám
                  pod vlivem alkoholických nápojů a psychotropních látek a dále těm uživatelům, kteří po výzvě
                  neuhradili předchozí platbu ve stanoveném termínu. Režim vstupu uživatelů sportovních zařízení do
                  prostor školy z řad veřejnosti upravují příslušná nařízení školy, s nimiž je tento provozní řád v
                  souladu.
                </li>
                <li>
                  Veškerá sportovní a tělovýchovná činnost všech uživatelů a dále rovněž pobyt ve všech prostorách
                  zázemí sportovních zařízení podléhá zákonným opatřením a souvisejícím předpisům a dále ustanovením
                  tohoto provozního řádu, zejména s důrazem na dodržování zásad BOZP, hygienických a ostatních předpisů,
                  souvisejících s provozováním tělovýchovných a sportovních aktivit. Majitel ani provozovatel
                  neodpovídají za škody na zdraví způsobené porušováním těchto zákonným předpisů a norem.
                </li>
                <li>
                  Škody, způsobené na majetku provozovatele nebo majitele, je povinen uhradit ten, kdo je způsobil a to
                  po dohodě s provozovatelem, v plné prokázané výši. Úmyslné poškozování sportovních zařízení a jejich
                  vybavení může být řešeno vyloučením uživatele z využívání těchto zařízení a dále případně řešeno jako
                  trestný čin.
                </li>
                <li>
                  Školní výuka tělesné výchovy a další tělesné aktivity žáků se řídí platnými předpisy pro školství,
                  pokyny MŠMT a vnitřními směrnicemi školy. Vždy musí být vedena pověřeným pracovníkem školy, nebo
                  vedoucím zájmového útvaru, starším osmnácti let.
                </li>
                <li>
                  Osoby nezletilé mladší osmnácti let mohou využívat sportovní zařízení vždy pouze pod vedením osoby
                  starší osmnácti let, která je odborně způsobilá k výkonu vedení těchto činností.
                </li>
                <li>
                  Poplatek za využití sportovních zařízení je odvozen od režijních nákladů, zejména cen energií a jeho
                  výše může být s ohledem na tyto vstupní ceny průběžně upravována. Ceník je nedílnou součástí tohoto
                  provozního řádu.
                </li>
                <li>
                  Poplatek je splatný předem, před započetím cvičebních aktivit a to proti dokladu, při dlouhodobém
                  pronájmu dle dohody s provozovatelem. Minimální časová jednotka pro výši poplatku a rozvrhu doby
                  využití je 30 minut, základní jednotkou je jedna hodina. Časový rozvrh je veřejně přístupný na
                  informační tabuli a je sestaven po dohodě s provozovatelem. V poplatku za časovou jednotku využití je
                  zahrnuta i cena za použití šaten, sprch, hygienických zařízení a příslušenství pro sportovní aktivity
                  (zabudované a mobilní doplňkové nářadí). V ceně není zahrnut poplatek za použití herního náčiní a
                  míčů. Tyto lze zapůjčit pouze po dohodě se správcem haly za poplatek, stanovený ředitelkou školy.
                </li>
              </ol>
            </div>
            <div className="article__body">
              <h2 className="article__heading">Ceník</h2>
              <ol>
                <li>
                  Základní poplatek, který platí všichni uživatelé haly, pokud nejsou dále výslovně uvedeni, činí 360,-
                  Kč/hod. Od 1. 5. do 30. 9. činí základní poplatek 250,- Kč/hod.
                </li>
                <li>Základní poplatek za použití sportovního hřiště, včetně zázemí při hale, činí 100,- Kč/hod.</li>
                <li>
                  Snížení poplatku až na 180,- Kč/hod. (hala) a až na 50,- Kč/hod. (venkovní hřiště) v tomto rozsahu je
                  oprávněn povolit snížení základního poplatku stanoveného dle bodů a), b) provozovatel (ředitelka
                  školy), pokud shledá důvody pro takové snížení hodné zřetele a výhledově přínosné pro obec či školu –
                  o svém rozhodnutí předem informuje starostu obce.
                </li>
                <li>
                  Zcela prominout placení poplatku je oprávněn starosta obce po projednání v radě obce v mimořádných
                  případech, zejména pokud se jedná o charitativní akce a akce jinak společensky významné.
                </li>
                <li>
                  Rozhodnutí o snížení poplatků nebo jejich prominutí dle předchozích bodů musí být provedeno průkazně
                  písemnou formou a předem, jinak je správce haly povinen vyžadovat platby v plné výši.
                </li>
              </ol>
              <p>Ztráta z příjmů za prominuté poplatky jde na vrub toho, kdo výjimku povolil.</p>
            </div>
            <div className="article__body">
              <span className="citation">
                Tato změna provozního řádu byla schválena Radou obce dne 13. 12. 2012 usnesením č. 44/7 a je platná od
                1. 1. 2013.
              </span>
              <div className="signatures">
                <span>Mgr. Ivana Uhlíková, ředitelka školy</span> <span>Ing. Miroslav Dula, starosta obce</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HalaPage;
