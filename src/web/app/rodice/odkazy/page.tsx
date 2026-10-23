import LinkList from "@/components/content/LinkList";
import LinkTable from "@/components/content/LinkTable";
import { getLinkGroups } from "@/lib/content/links";

// a group with a single address is shown as a plain link, the others as "what it is | address" rows
const RodiceOdkazyPage = async () => {
  const groups = await getLinkGroups("/rodice/odkazy");
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Odkazy na weby</h1>
            {groups.map((group) => (
              <div className="article__body" key={group.id}>
                <h2>{group.title}</h2>
                {group.links.length === 1 ? <LinkList links={group.links} /> : <LinkTable links={group.links} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RodiceOdkazyPage;
