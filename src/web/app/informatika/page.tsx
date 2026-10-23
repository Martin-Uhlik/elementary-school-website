import { Fragment } from "react";
import LinkGrid from "@/components/content/LinkGrid";
import { getLinkGroups } from "@/lib/content/links";

const InformatikaPage = async () => {
  const groups = await getLinkGroups("/informatika");
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Informatika</h1>
            {groups.map((group) => (
              <Fragment key={group.id}>
                <h2>{group.title}</h2>
                <LinkGrid links={group.links} />
                <br />
                <br />
                <br />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InformatikaPage;
