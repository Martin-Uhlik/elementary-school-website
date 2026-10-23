import NextLink from "next/link";
import type { Link } from "@/data/types";
import { getLinkType, LINK_TYPE_LABELS, type LinkType } from "@/lib/content/linkType";

// what the coloured square shows for each type
const BADGES: Record<LinkType, string> = {
  page: "→",
  external: "↗",
  video: "▶",
  pdf: "PDF",
  word: "DOC",
  excel: "XLS",
  powerpoint: "PPT",
  scratch: "SB3",
  file: "ZIP",
};

const domain = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "www.").replace(/\/.*$/, "");

// the line under the title: the type, or the address for another website
const meta = (type: LinkType, href: string) => {
  if (type === "external") return domain(href);
  if (type === "page") return "Stránka webu";
  return LINK_TYPE_LABELS[type];
};

// A link as a tile: a coloured square with its type (PDF, DOC, ↗ ...), the title and the type or address under it
const LinkItem = ({ link }: { link: Link }) => {
  const type = link.href ? getLinkType(link.href) : undefined;
  const content = (
    <>
      <span className={`link-tile__badge link-tile__badge--${type ?? "none"}`} aria-hidden="true">
        {type ? BADGES[type] : "–"}
      </span>
      <span className="link-tile__text">
        <span className="link-tile__title">{link.title}</span>
        {link.href && type && (
          <span className="link-tile__meta">
            {meta(type, link.href)}
            {type === "external" && <span className="visually-hidden"> ({LINK_TYPE_LABELS.external})</span>}
          </span>
        )}
        {link.description?.map((text) => (
          <span className="link-tile__description" key={text}>
            {text}
          </span>
        ))}
      </span>
    </>
  );

  if (!link.href || !type) return <span className="link-tile link-tile--disabled">{content}</span>;
  if (type === "page")
    return (
      <NextLink href={link.href} className="link-tile">
        {content}
      </NextLink>
    );
  const href = /^https?:/.test(link.href) ? link.href : encodeURI(link.href);
  return (
    <a href={href} target="_blank" className="link-tile">
      {content}
    </a>
  );
};

export default LinkItem;
