import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";

// Ported from html/rodice/oznameni-fromulare.html
const RodiceOznameniFromularePage = async () => {
  const oznameniFromulare = await getLinkGroup("rodice-oznameni-fromulare");
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Pro rodiče</h1>
            <LinkList links={oznameniFromulare.links} className="article__list documents" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RodiceOznameniFromularePage;
