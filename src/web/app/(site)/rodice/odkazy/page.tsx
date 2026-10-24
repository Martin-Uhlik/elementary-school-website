import LinkList from "@/components/content/LinkList";
import { getLinkGroups } from "@/lib/content/links";

const RodiceOdkazyPage = async () => {
  const groups = await getLinkGroups("/rodice/odkazy");
  return (
    <>
      <div className="body">
        <div className="article">
          <div className="article__section">
            <h1>Odkazy na weby</h1>
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

export default RodiceOdkazyPage;
