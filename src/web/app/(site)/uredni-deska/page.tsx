import type { Metadata } from "next";
import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/uredni-deska",
  "Úřední deska",
  "Úřední deska ZŠ a MŠ Moravský Písek: rozpočty, střednědobé výhledy rozpočtu a informace o ochraně osobních údajů (GDPR).",
);

// Ported from html/uredni-deska.html
const UredniDeskaPage = async () => {
  const deska = await getLinkGroup("uredni-deska");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Úřední deska</h1>
            <LinkList links={deska.links} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UredniDeskaPage;
