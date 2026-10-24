import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";

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
