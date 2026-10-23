import NextLink from "next/link";
import type { Link } from "@/data/types";
import { getLinkType, LINK_TYPE_LABELS } from "@/lib/content/linkType";

type Props = {
  link: Link;
  // replaces the title as the link's content
  children?: React.ReactNode;
  // off where the content already shows the address, e.g. "www.msmt.cz"
  showType?: boolean;
};

// A link with a badge for its type (PDF, Word, ...) or an arrow for another website
const LinkItem = ({ link, children, showType = true }: Props) => {
  const label = children ?? link.title;
  if (!link.href) return <span>{label}</span>;

  const type = getLinkType(link.href);
  if (type === "page") return <NextLink href={link.href}>{label}</NextLink>;

  const href = type === "external" || /^https?:/.test(link.href) ? link.href : encodeURI(link.href);
  return (
    <a href={href} target="_blank">
      {label}
      {!showType ? null : type === "external" ? (
        <span className="link-type link-type--external">
          <span aria-hidden="true">↗</span>
          <span className="visually-hidden"> ({LINK_TYPE_LABELS.external})</span>
        </span>
      ) : (
        <span className={`link-type link-type--${type}`}>
          <span className="visually-hidden"> (</span>
          {LINK_TYPE_LABELS[type]}
          <span className="visually-hidden">)</span>
        </span>
      )}
    </a>
  );
};

export default LinkItem;
