import LinkItem from "./LinkItem";
import type { Link } from "@/data/types";

// Links two per row, as on the Informatika page
const LinkGrid = ({ links }: { links: Link[] }) => {
  const rows = Array.from({ length: Math.ceil(links.length / 2) }, (_, i) => links.slice(i * 2, i * 2 + 2));
  return (
    <table className="inf">
      <tbody>
        {rows.map((row) => (
          <tr key={row[0].id}>
            {row.map((link) => (
              <td key={link.id}>
                <LinkItem link={link} />
              </td>
            ))}
            {row.length === 1 && <td></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinkGrid;
