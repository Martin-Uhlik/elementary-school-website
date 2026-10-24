import { LuSun } from "react-icons/lu";
import FeatureLink from "@/components/content/FeatureLink";
import PersonCard from "@/components/content/PersonCard";
import { getPeople } from "@/lib/content/people";

// Ported from html/organizace/materska-skola.html
const OrganizaceMaterskaSkolaPage = async () => {
  const staff = await getPeople("Mateřská škola");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Mateřská škola</h1>
            <FeatureLink href="https://msmp1.webnode.cz/" title="Vlastní webové stránky mateřské školy" Icon={LuSun} />
            <div>
              <span>
                Mateřská škola se nachází uprostřed obce v prostorné zahradě. Má tři smíšené třídy s kapacitou 48 dětí.
                V roce 2006 byla nově zrekonstruována - okna, střecha, zateplení, fasáda, upravily se také vnitřní
                prostory - umývárna,WC, zařízení tříd a šaten. V září roku 2021 byla otevřena třída na sokolovně.
              </span>{" "}
              <span>
                Během školního roku organizujeme návštěvu divadla v Uherském Hradišti a ve Zlíně, divadélko v prostorách
                MŠ - ZŠ, hudební koncert, výlet dětí, grafomotoriku. Akce s rodiči: uspávání broučků ve spolupráci s
                mysliveckým sdružením, čertování, tvoření z dýní, karneval, čarodějnice, besídka pro maminky, diskotéka
                s opékáním špekáčků ke dni dětí.
              </span>
            </div>
          </div>
        </div>
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Kontakty</h1>
            <div className="persons">
              {staff.map((person) => (
                <PersonCard key={person.id} person={person} variant="short" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizaceMaterskaSkolaPage;
