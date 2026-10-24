import InfoTooltip from "./InfoTooltip";
import LinkItem from "./LinkItem";
import type { Link } from "@/lib/content/types";

// Links as a grid of tiles, one column on phones
const LinkList = ({ links, columns }: { links: Link[]; columns?: 1 }) => {
  return (
    <ul className={`link-tiles${columns === 1 ? " link-tiles--single" : ""}`}>
      {links.map((link) => (
        <li key={link.id} className={link.details ? "link-tiles__item link-tiles__item--details" : "link-tiles__item"}>
          <LinkItem link={link} withDetails={Boolean(link.details)} />
          {link.details && <InfoTooltip label={`Více o: ${link.title}`} text={link.details} />}
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
