// Ported from html/organizace/materska-skola.html
export default function OrganizaceMaterskaSkolaPage() {
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Mateřská škola</h1>
            <div className="link_huge">
              <a href="https://msmp1.webnode.cz/" target="_blank">
                Vlastní webové stránky mateřské školy
              </a>{" "}
              <img className="icon--blue" src="/data/images/icons/weather-sunny.svg" alt="" />
            </div>
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
          <hr className="article__line" />
          <div className="article__section">
            <h1>Dokumenty</h1>
            <ul className="documents">
              <li>
                <a href="/dokument/skolka-rad.doc" target="_blank">
                  Školní řád
                </a>
              </li>
              <li>
                <a href="/dokument/skolka-SVP.doc" target="_blank">
                  Školní vzdělávací program
                </a>
              </li>
              <li>
                <a href="/dokument/skolka-uplata-ustanoveni.doc" target="_blank">
                  Úplata za předškolní vzdělávání - ustanovení
                </a>
              </li>
              <li>
                <a href="/dokument/skolka-uplata.doc" target="_blank">
                  Úplata za předškolní vzdělávání
                </a>
              </li>
              <li>
                <a href="/dokument/skolka-kriteria.doc" target="_blank">
                  Kritéria pro přijímání dětí
                </a>
              </li>
              <li>
                <a href="/dokument/skolka-registr.doc" target="_blank">
                  Přidělení registračního čísla
                </a>
              </li>
              <li>
                <a href="/dokument/skolka-dohoda.doc" target="_blank">
                  Dohoda rodičů - vyřizování záležitostí
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Kontakty</h1>
            <div className="persons">
              <div>
                <h2 className="h2">Mgr. Jana Zezulová</h2>
                <span>tel.: 739 357 820</span>{" "}
                <span>
                  e-mail: <a href="mailto:zezulova@zsmp.cz">zezulova@zsmp.cz</a>
                </span>{" "}
                <span>zástupkyně ředitelky pro MŠ</span>
              </div>
              <div>
                <h2 className="h2">Bronislava Lidmanová</h2>
                <span>
                  email: <a href="mailto:lidmanova@zsmp.cz">lidmanova@zsmp.cz</a>
                </span>{" "}
                <span>učitelka</span>
              </div>
              <div>
                <h2 className="h2">Bc. Veronika Slavíková</h2>
                <span>
                  email: <a href="mailto:slavikova@zsmp.cz">slavikova@zsmp.cz</a>
                </span>{" "}
                <span>RD</span>
              </div>
              <div>
                <h2 className="h2">Šárka Vavrincová</h2>
                <span>
                  email: <a href="mailto:vavrincova@zsmp.cz">vavrincova@zsmp.cz</a>
                </span>{" "}
                <span>učitelka</span>
              </div>
              <div>
                <h2 className="h2">Marcela Zábelková</h2>
                <span>
                  email: <a href="mailto:zabelkova@zsmp.cz">zabelkova@zsmp.cz</a>
                </span>{" "}
                <span>učitelka</span>
              </div>
              <div>
                <h2 className="h2">Miroslava Plachá</h2>
                <span>provozní pracovnice</span>
              </div>
              <div>
                <h2 className="h2">Alžběta Podráská</h2>
                <span>učitelka</span>
              </div>
              <div>
                <h2 className="h2">Anna Matoušková</h2>
                <span>učitelka</span>
              </div>
              <div>
                <h2 className="h2">Veronika Sládková</h2>
                <span>asistentka pedagoga</span>
              </div>
              <div>
                <h2 className="h2">Lucie Kolajová</h2>
                <span>asistentka pedagoga</span>
              </div>
              <div>
                <h2 className="h2">Jana Kolúchová</h2>
                <span>asistentka pedagoga</span>
              </div>
              <div>
                <h2 className="h2">Marie Jochová</h2>
                <span>provozní pracovnice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
