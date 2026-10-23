import LinkItem from "./LinkItem";
import type { Link } from "@/data/types";

const domain = (href: string) => href.replace(/^https?:\/\//, "").replace(/\/$/, "");

// "What it is | address" rows, as on the Odkazy page; phones show a link icon instead of the address
const LinkTable = ({ links }: { links: Link[] }) => {
  return (
    <table className="table">
      <tbody>
        {links.map((link) => (
          <tr key={link.id}>
            <td>{link.title}</td>
            <td>
              {link.href && (
                <LinkItem link={link} showType={false}>
                  <span className="small-hidden">{domain(link.href)}</span>{" "}
                  <img className="icon icon--blue large-hidden" src="/data/images/icons/link.svg" alt={link.title} />
                </LinkItem>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinkTable;
