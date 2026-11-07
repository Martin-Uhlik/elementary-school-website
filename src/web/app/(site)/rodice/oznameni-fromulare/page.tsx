import type { Metadata } from "next";
import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/rodice/oznameni-fromulare",
  "Oznámení a formuláře",
  "Oznámení a formuláře pro rodiče žáků ZŠ a MŠ Moravský Písek ke stažení.",
);

// Ported from html/rodice/oznameni-fromulare.html
const RodiceOznameniFromularePage = async () => {
  const oznameniFromulare = await getLinkGroup("rodice-oznameni-fromulare");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Pro rodiče</h1>
            <LinkList links={oznameniFromulare.links} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RodiceOznameniFromularePage;
