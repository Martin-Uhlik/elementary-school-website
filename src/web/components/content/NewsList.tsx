import LinkItem from "./LinkItem";
import type { NewsItem } from "@/lib/content/types";

export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day}. ${month}. ${year}`;
};

// News on the home page: date, heading, text (an empty line starts a new paragraph) and an optional link
const NewsList = ({ news }: { news: NewsItem[] }) => (
  <ul className="news">
    {news.map((item) => (
      <li key={item.id} className="news__item">
        <article className="news__article" aria-labelledby={`news-${item.id}`}>
          <time className="news__date" dateTime={item.date}>
            {formatDate(item.date)}
          </time>
          <h2 id={`news-${item.id}`} className="news__title">
            {item.title}
          </h2>
          {item.text
            .split(/\n\s*\n/)
            .filter((p) => p.trim())
            .map((paragraph, i) => (
              <p key={i} className="news__text">
                {paragraph}
              </p>
            ))}
          {item.href && <LinkItem link={{ id: item.id, groupId: "news", title: "Více informací", href: item.href }} />}
        </article>
      </li>
    ))}
  </ul>
);

export default NewsList;
