import LinkList from "@/components/content/LinkList";
import { getLinkGroups } from "@/lib/content/links";

const InformatikaPage = async () => {
  const groups = await getLinkGroups("/informatika");
  return (
    <>
      <div className="page">
        <div className="article">
          <div className="article__section">
            <h1 className="article__title">Informatika</h1>
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

export default InformatikaPage;
