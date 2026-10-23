// Ported from html/jidelna.html
const JidelnaPage = () => {
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Školní jídelna</h1>
            <div className="zig_zag">
              <div className="zig_zag__line-left">
                <div className="article__body">
                  <span className="link_huge">
                    <a href="https://www.strava.cz/Strava/Stravnik/Prihlaseni?zarizeni=2176" target="_blank">
                      Přihlášení - odhlášení stravy
                    </a>{" "}
                    <img className="icon--blue" src="/data/images/icons/silverware.svg" alt="" />
                  </span>{" "}
                  <span>Stravu na další den lze přihlásit - odhlásit do 14.30 hodin.</span>
                </div>
                <img className="img_circle" src="/data/images/jidelna/jidelna_1.jpg" alt="Fotografie jídelny" />
              </div>

              <div className="zig_zag__line-right">
                <img className="img_circle" src="/data/images/jidelna/jidelna_2.jpg" alt="Fotografie jídelny" />{" "}
                <span className="link_huge">
                  <a href="https://www.strava.cz/strava5/Jidelnicky?zarizeni=2176" target="_blank">
                    Jídelní lístek
                  </a>{" "}
                  <img className="icon--blue" src="/data/images/icons/carrot.svg" alt="" />
                </span>
              </div>

              <div className="zig_zag__line-left">
                <div className="article__body">
                  <h2>Dokumenty</h2>
                  <ul className="documents">
                    <li>
                      <a href="/dokument/jídelna_přihláška_ZŠ.doc" target="_blank">
                        Přihláška ke stravování pro základní školu
                      </a>
                    </li>
                    <li>
                      <a href="/dokument/jídelna_přihláška_MŠ.doc" target="_blank">
                        Přihláška ke stravování pro mateřskou školu
                      </a>
                    </li>
                    <li>
                      <a href="/dokument/jidelna-smernice_zs.doc" target="_blank">
                        Směrnice o stravování žáků v ZŠ
                      </a>
                    </li>
                    <li>
                      <a href="/dokument/jidelna-smernice_ms.doc" target="_blank">
                        Směrnice o stravování dětí v MŠ
                      </a>
                    </li>
                    <li>
                      <a href="/dokument/20230901_stravne.doc" target="_blank">
                        Ceník stravného od 1. 9. 2023
                      </a>
                    </li>
                  </ul>
                </div>
                <img className="img_circle" src="/data/images/jidelna/jidelna_3.jpg" alt="Fotografie jídelny" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JidelnaPage;
