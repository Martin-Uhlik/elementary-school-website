import PersonCard from "@/components/content/PersonCard";
import { getPeople } from "@/lib/content/people";

// Ported from html/organizace/srpds.html
const OrganizaceSrpdsPage = async () => {
  const board = await getPeople("SRPDŠ");
  return (
    <>
      <div className="body">
        <div className="article">
          <div className="article__section">
            <h1>Sdružení rodičů a přátel dětí školy</h1>
            <span>
              SRPDŠ je registrované občanské sdružení u Ministerstva vnitra ČR dne 9. 7. 1992, č. j. VSC/1-12387/92-RS.
              S účinností od 1. 1. 1993 je registrováno u FÚ Veselí nad Moravou, přiděleno DIČ: CZ47375868.
            </span>
            <div className="article__body">
              <h2>Rada</h2>
              <div className="persons">
                {board.map((person) => (
                  <PersonCard key={person.id} person={person} variant="short" level={3} />
                ))}
              </div>
              <p className="mt-3">+ zástupci jednotlivých tříd</p>
            </div>
            <h2>Stanovy</h2>
            <h3>1. Činnost spolku</h3>
            <ul>
              <li>
                Hlavní činností spolku je spolupráce zákonných zástupců dětí se Základní školou a Mateřskou školou,
                Moravský Písek, Velkomoravská 168.
              </li>
              <li>
                Pomoc škole materiálními a finančními prostředky při zajišťování výchovné činnosti a zlepšování školního
                prostředí.
              </li>
            </ul>
            <span>předkládání návrhů, připomínek a stížnosti rodičů a podílení se na jejich vyřízení.</span>
            <h3>2. Povinnosti členů SRPDŠ</h3>
            <ul>
              <li>Člen SRPDŠ je povinen dodržovat stanovy SRPDŠ a zaplatit ve stanovené lhůtě členský příspěvek</li>
              <li>Spolupracovat při realizaci cílů SRPDŠ</li>
              <li>Plnit odsouhlasené postupy a rozhodnutí</li>
              <li>
                Zdržet se jakéhokoli jednání, jímž by byla poškozena pověst a dobré jméno organizace nebo uvádět na
                veřejnosti záležitosti, o nichž se dozvěděl v souvislosti s činností SRPDŠ
              </li>
            </ul>
            <h3>3. Členství</h3>
            <ul>
              <li>
                Členem SRPDŠ se může stát každý občan starší 18 let, který souhlasí se stanovami SRPDŠ a jeho činností.
              </li>
              <li>
                Člen SRPDŠ má právo aktivně se podílet na každé činnosti SRPDŠ, zúčastnit se schůze rady, volit a být
                volen do orgánů SRPDŠ, vznášet své názory, náměty a připomínky k činnosti SRPDŠ a osobně se zúčastnit
                projednávání svých návrhů.
              </li>
            </ul>
            <span>
              <u>Vznik členství v SRPDŠ:</u>
            </span>
            <ul>
              <li>
                Rodiče a zákonní zástupci dětí aktuálně registrovaných ve škole, kteří zaplatí členský příspěvek, se
                automaticky stávají členy.
              </li>
              <li>
                Ostatní osoby se stávají členy SRPŠ po podání písemné přihlášky výboru rady SRPDŠ a zaplacení členského
                příspěvku.
              </li>
            </ul>
            <span>
              <u>Členství člena SRPDŠ zaniká:</u>
            </span>
            <ul>
              <li>
                Ukončením školní docházky žáka do školy pro jeho rodiče nebo zákonného zástupce, ledaže by tento člen
                požádal o zachování členství;
              </li>
              <li>Doručením písemné žádosti o skončení členství výboru;</li>
              <li>
                Vyloučením pro neplacení členského příspěvku ve lhůtě určené výborem. O vyloučení člena rozhoduje po
                opakované výzvě k zaplacení příspěvku výbor;
              </li>
              <li>
                Vyloučením z důvodu závažného nebo opakovaného porušování stanov, jiných vnitřních předpisů spolku,
                usnesení a rozhodnutí orgánů spolku nebo jiných členských povinností;
              </li>
              <li>Úmrtím člena;</li>
              <li>Zánikem spolku;</li>
              <li>
                Při ukončení členství nebo vyloučení člena ze SRPDŠ mu nevzniká nárok na vrácení finančních prostředků
                či jiných darů.
              </li>
            </ul>
            <h3>4. Orgány spolku</h3>
            <ul>
              <li>
                Nejvyšším orgánem je rada SRPDŠ (dále jen „rada“), složená ze zástupců členů SRPDŠ zvolených v
                jednotlivých třídách, kdy za každou třídu jsou zvoleni dva zástupci. Rada řídí činnost SRPDŠ, projednává
                všechny otázky v působnosti SRPDŠ a schvaluje změny stanov. Jednání rady se může účastnit každý člen
                SRPDŠ, který o to projeví zájem. Při projednávání otázek souvisejících s prací školy zve rada na jednání
                ředitele, popř. další zástupce školy. Rada je svolávána nejméně jedenkrát ročně, z každého jednání se
                pořizuje písemný záznam.
              </li>
              <li>Všechny funkce v SRPDŠ jsou čestné, bez nároku na odměnu.</li>
            </ul>
            <h3>5. Zánik spolku</h3>
            <ul>
              <li>Spolek zaniká: zrušením spolku s likvidací, fúzí spolků nebo rozdělením spolku.</li>
              <li>
                O zániku SRPDŠ rozhoduje rada a výbor jej oznamuje orgánům, u kterých je SRPDŠ registrován. Při zániku
                se stanoví likvidační komise, která vypořádá práva a závazky SRPDŠ.
              </li>
              <li>Zánik SRPŠ ohlásí předseda výboru řediteli školy.</li>
              <li>
                Zaniká-li SRPŠ likvidací, likvidační zůstatek připadne škole, která jej použije k financování
                mimoškolních aktivit pro své žáky.
              </li>
            </ul>
            <h3>6. Závěrečná ustanovení</h3>
            <ul>
              <li>
                Otázky, které nejsou upraveny těmito stanovami, se řídí platnými právními předpisy, zejména ustanovením
                zákona č. 89/2012 Sb., nový občanský zákoník.
              </li>
              <li>Změny a dodatky těchto stanov schvaluje rada SRPŠ písemným zápisem.</li>
            </ul>
            <span>V Moravském Písku dne 8. 10. 2024</span>
            <span>v. r. Barbora Janíková</span>
            <span>předsedkyně</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizaceSrpdsPage;
