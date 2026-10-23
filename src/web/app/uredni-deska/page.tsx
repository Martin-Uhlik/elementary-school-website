import LinkList from "@/components/content/LinkList";
import { getLinkGroup } from "@/lib/content/links";

// Ported from html/uredni-deska.html
const UredniDeskaPage = async () => {
  const deska = await getLinkGroup("uredni-deska");
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Úřední deska</h1>
            <LinkList links={deska.links} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UredniDeskaPage;
