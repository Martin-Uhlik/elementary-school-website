import type { Metadata } from "next";
import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/skolni-poradenske-sluzby",
  "Školní poradenské služby",
  "Školní poradenské služby ZŠ Moravský Písek: preventivní program školy, jeho hodnocení a krizový scénář pro případ šikany.",
);

// Ported from skolni-poradenske-sluzby.html on the production site
const SkolniPoradenskeSluzbyPage = async () => {
  const documents = await getLinkGroup("skolni-poradenske-sluzby");
  return (
    <div className="page">
      <div className="article">
        <div className="article__section">
          <h1 className="article__title">Školní poradenské služby</h1>
          <LinkList links={documents.links} />
        </div>
      </div>
    </div>
  );
};

export default SkolniPoradenskeSluzbyPage;
