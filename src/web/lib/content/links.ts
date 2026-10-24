import { db } from "@/lib/db";
import type { Link as LinkRow, LinkGroup as LinkGroupRow } from "@/lib/generated/prisma/client";
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

const include = { links: { orderBy: { sortOrder: "asc" } } } as const;

// All link groups shown on a page, in display order
export const getLinkGroups = async (page: string) =>
  (await (await db()).linkGroup.findMany({ where: { page }, orderBy: { sortOrder: "asc" }, include })).map(toGroup);

export const getLinkGroup = async (id: string) => {
  const group = await (await db()).linkGroup.findUnique({ where: { id }, include });
  if (!group) throw new Error(`Unknown link group: ${id}`);
  return toGroup(group);
};
