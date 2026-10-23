import LinkList from "@/components/content/LinkList";
import { getLinkGroups } from "@/lib/content/links";

const DokumentyPage = async () => {
  const groups = await getLinkGroups("/dokumenty");
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Dokumenty základní školy</h1>
            {groups.map((group) => (
              <div className="article__body" key={group.id}>
                <h2>{group.title}</h2>
                <LinkList links={group.links} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DokumentyPage;
