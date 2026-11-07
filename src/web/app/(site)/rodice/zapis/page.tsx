import type { Metadata } from "next";
import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/rodice/zapis",
  "Zápis do 1. třídy",
  "Zápis žáků do 1. třídy ZŠ Moravský Písek: plakát, desatero pro rodiče, žádost o přijetí, zápisní list a další formuláře.",
);

// Ported from html/rodice/zapis.html
const RodiceZapisPage = async () => {
  const zapis = await getLinkGroup("rodice-zapis");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Zápis žáků 1. třídy do školního roku 2023/2024</h1>
            <LinkList links={zapis.links} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RodiceZapisPage;
