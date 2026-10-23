import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";

// Ported from html/jidelna.html
const JidelnaPage = async () => {
  const dokumenty = await getLinkGroup("jidelna-dokumenty");
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
                  <LinkList links={dokumenty.links} />
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
