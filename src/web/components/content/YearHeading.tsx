import { galleriesLabel, yearAnchor } from "@/lib/content/format";

// Heading of one year on an archive page. It looks like the sticky YearNav bar and slides under it;
// the first year's heading is only for screen readers, because the bar stands in its place.
const YearHeading = ({ year, count, first }: { year: number; count: number; first: boolean }) => (
  <div className={first ? "visually-hidden" : "year-heading"}>
    <h2 id={`${yearAnchor(year)}-h`} className="year-heading__year">
      {year}
    </h2>
    <span className="year-heading__count">{galleriesLabel(count)}</span>
  </div>
);

export default YearHeading;
