import { linkGroups, links } from "@/data/links";
import type { Link, LinkGroup } from "@/data/types";

export type LinkGroupWithLinks = LinkGroup & { links: Link[] };

const withLinks = (group: LinkGroup): LinkGroupWithLinks => ({
  ...group,
  links: links.filter((link) => link.groupId === group.id),
});

// All link groups shown on a page, in display order
export const getLinkGroups = async (page: string) => linkGroups.filter((g) => g.page === page).map(withLinks);

export const getLinkGroup = async (id: string) => {
  const group = linkGroups.find((g) => g.id === id);
  if (!group) throw new Error(`Unknown link group: ${id}`);
  return withLinks(group);
};
