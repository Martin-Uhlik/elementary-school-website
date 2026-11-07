import type { Metadata } from "next";
import { LuCarrot, LuUtensils } from "react-icons/lu";
import FeatureLink from "@/components/content/FeatureLink";
import LinkList from "@/components/content/LinkList";
import CanteenMenu from "@/components/content/CanteenMenu";
import ZigZagPath from "@/components/content/ZigZagPath";
import { CANTEEN_MENU_URL } from "@/lib/content/canteen";
import { getLinkGroup } from "@/lib/content/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/jidelna",
  "Školní jídelna",
  "Školní jídelna ZŠ a MŠ Moravský Písek: jídelní lístek, přihlašování a odhlašování obědů a dokumenty jídelny.",
);

// Ported from html/jidelna.html
const JidelnaPage = async () => {
  const dokumenty = await getLinkGroup("jidelna-dokumenty");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Školní jídelna</h1>
            <div className="zig-zag">
              <ZigZagPath />
              <div className="zig-zag__row zig-zag__row--left">
                <div className="zig-zag__text">
                  <FeatureLink
                    href="https://app.strava.cz/prihlasit-se?jidelna=2176"
                    title="Přihlášení - odhlášení stravy"
                    description="Stravu na další den lze přihlásit - odhlásit do 14.30 hodin."
                    Icon={LuUtensils}
                  />
                </div>
                <img className="zig-zag__photo" src="/data/images/jidelna/jidelna_1.jpg" alt="Fotografie jídelny" />
              </div>

              <div className="zig-zag__row zig-zag__row--right">
                <img className="zig-zag__photo" src="/data/images/jidelna/jidelna_2.jpg" alt="Fotografie jídelny" />{" "}
                <div className="zig-zag__text">
                  <FeatureLink href={CANTEEN_MENU_URL} title="Jídelní lístek" Icon={LuCarrot} />
                </div>
              </div>

              <div className="zig-zag__row zig-zag__row--left">
                <div className="zig-zag__text">
                  <h2 className="article__heading">Dokumenty</h2>
                  <LinkList links={dokumenty.links} />
                </div>
                <img className="zig-zag__photo" src="/data/images/jidelna/jidelna_3.jpg" alt="Fotografie jídelny" />
              </div>
            </div>
          </div>
        </div>
        <div className="article">
          <CanteenMenu />
        </div>
      </div>
    </>
  );
};

export default JidelnaPage;
