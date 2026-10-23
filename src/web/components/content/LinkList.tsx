import LinkItem from "./LinkItem";
import type { Link } from "@/data/types";

// Links as a grid of tiles, one column on phones
const LinkList = ({ links, columns }: { links: Link[]; columns?: 1 }) => {
  return (
    <ul className={`link-tiles${columns === 1 ? " link-tiles--single" : ""}`}>
      {links.map((link) => (
        <li key={link.id}>
          <LinkItem link={link} />
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
