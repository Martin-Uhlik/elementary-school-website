import { asc, eq } from "drizzle-orm";
import { linkGroups, links, type Link as LinkRow, type LinkGroup as LinkGroupRow } from "@zsmp/db/schema";
import { db } from "@/lib/db";
import type { Link, LinkGroup } from "@/lib/content/types";

export type LinkGroupWithLinks = LinkGroup & { links: Link[] };

export const toLink = (row: LinkRow): Link => ({
  id: row.id,
  groupId: row.groupId,
  title: row.title,
  href: row.href ?? undefined,
  description: row.description,
  details: row.details ?? undefined,
});

const toGroup = (row: LinkGroupRow & { links: LinkRow[] }): LinkGroupWithLinks => ({
  id: row.id,
  page: row.page,
  title: row.title ?? undefined,
  links: row.links.map(toLink),
});

export const withLinks = { links: { orderBy: asc(links.sortOrder) } };

// All link groups shown on a page, in display order
export const getLinkGroups = async (page: string) =>
  (
    await (
      await db()
    ).query.linkGroups.findMany({
      where: eq(linkGroups.page, page),
      orderBy: [asc(linkGroups.sortOrder)],
      with: withLinks,
    })
  ).map(toGroup);

export const getLinkGroup = async (id: string) => {
  const group = await (await db()).query.linkGroups.findFirst({ where: eq(linkGroups.id, id), with: withLinks });
  if (!group) throw new Error(`Unknown link group: ${id}`);
  return toGroup(group);
};
