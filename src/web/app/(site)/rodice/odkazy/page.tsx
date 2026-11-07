import type { Metadata } from "next";
import LinkList from "@/components/content/LinkList";
import { getLinkGroups } from "@/lib/content/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/rodice/odkazy",
  "Odkazy",
  "Užitečné odkazy pro rodiče a žáky ZŠ a MŠ Moravský Písek.",
);

const RodiceOdkazyPage = async () => {
  const groups = await getLinkGroups("/rodice/odkazy");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Odkazy na weby</h1>
            {groups.map((group) => (
              <div className="article__body" key={group.id}>
                <h2 className="article__heading">{group.title}</h2>
                <LinkList links={group.links} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RodiceOdkazyPage;
