import "server-only";

type Row = { id: string; sortOrder: number };

// The rows to swap when moving one row up or down in a list sorted by sortOrder, or null at the edge
export const neighbour = <T extends Row>(rows: T[], id: string, direction: "up" | "down") => {
  const index = rows.findIndex((row) => row.id === id);
  const other = rows[direction === "up" ? index - 1 : index + 1];
  return index < 0 || !other ? null : ([rows[index], other] as const);
};
