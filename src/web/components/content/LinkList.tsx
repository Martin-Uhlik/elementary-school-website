import LinkItem from "./LinkItem";
import type { Link } from "@/data/types";

// The site's usual list of documents: one link per line, with optional notes under it
const LinkList = ({ links, className = "documents" }: { links: Link[]; className?: string }) => {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.id}>
          <LinkItem link={link} />
          {link.description?.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
