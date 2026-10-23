import { LuCarrot, LuUtensils } from "react-icons/lu";
import FeatureLink from "@/components/content/FeatureLink";
import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";

// Ported from html/jidelna.html
const JidelnaPage = async () => {
  const dokumenty = await getLinkGroup("jidelna-dokumenty");
  return (
    <>
      <div className="body">
        <div className="article">
          <div className="article__section">
            <h1>Školní jídelna</h1>
            <div className="zig_zag">
              <div className="zig_zag__line-left">
                <div className="article__body">
                  <FeatureLink
                    href="https://www.strava.cz/Strava/Stravnik/Prihlaseni?zarizeni=2176"
                    title="Přihlášení - odhlášení stravy"
                    description="Stravu na další den lze přihlásit - odhlásit do 14.30 hodin."
                    Icon={LuUtensils}
                  />
                </div>
                <img className="zig_zag__photo" src="/data/images/jidelna/jidelna_1.jpg" alt="Fotografie jídelny" />
              </div>

              <div className="zig_zag__line-right">
                <img className="zig_zag__photo" src="/data/images/jidelna/jidelna_2.jpg" alt="Fotografie jídelny" />{" "}
                <div className="article__body">
                  <FeatureLink
                    href="https://www.strava.cz/strava5/Jidelnicky?zarizeni=2176"
                    title="Jídelní lístek"
                    Icon={LuCarrot}
                  />
                </div>
              </div>

              <div className="zig_zag__line-left">
                <div className="article__body">
                  <h2>Dokumenty</h2>
                  <LinkList links={dokumenty.links} />
                </div>
                <img className="zig_zag__photo" src="/data/images/jidelna/jidelna_3.jpg" alt="Fotografie jídelny" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JidelnaPage;
