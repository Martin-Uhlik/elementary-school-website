import { LuSun } from "react-icons/lu";
import type { CalendarEvent } from "@/data/types";
import { getSchoolYears } from "@/lib/content/misc";

// **text** in the data is shown in bold
const withBold = (text: string) => text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));

const toDate = (iso: string) => new Date(`${iso}T12:00:00`);
const monthFormat = new Intl.DateTimeFormat("cs", { month: "short" });
const dateFormat = new Intl.DateTimeFormat("cs", { day: "numeric", month: "long", year: "numeric" });
const dayMonthFormat = new Intl.DateTimeFormat("cs", { day: "numeric", month: "long" });

// e.g. "4. září 2023", "26.–27. října 2023" or "23. prosince 2023 – 2. ledna 2024"
const dateLabel = ({ date, endDate }: CalendarEvent) => {
  const start = toDate(date);
  if (!endDate) return dateFormat.format(start);
  const end = toDate(endDate);
  if (start.getFullYear() !== end.getFullYear()) return `${dateFormat.format(start)} – ${dateFormat.format(end)}`;
  if (start.getMonth() !== end.getMonth()) return `${dayMonthFormat.format(start)} – ${dateFormat.format(end)}`;
  return `${start.getDate()}.–${dateFormat.format(end)}`;
};

const OrganizacePrubehSkolnihoRokuPage = async () => {
  const years = await getSchoolYears();
  return (
    <>
      <div className="body">
        {years.map(({ schoolYear, events }) => (
          <div key={schoolYear} className="article">
            <div className="article__section">
              <h1>Průběh školního roku {schoolYear}</h1>
              <ol className="timeline">
                {events.map((event) => (
                  <li key={event.id} className={`timeline__item${event.holiday ? " timeline__item--holiday" : ""}`}>
                    <span className="timeline__leaf" aria-hidden="true">
                      <span className="timeline__month">{monthFormat.format(toDate(event.date)).replace(".", "")}</span>
                      <span className="timeline__day">{toDate(event.date).getDate()}</span>
                    </span>
                    <div className="timeline__card">
                      <p className="timeline__date">
                        <time dateTime={event.date}>{dateLabel(event)}</time>
                        {event.holiday && (
                          <span className="timeline__badge">
                            <LuSun aria-hidden="true" focusable="false" /> Prázdniny
                          </span>
                        )}
                      </p>
                      <p className="timeline__text">{withBold(event.text)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrganizacePrubehSkolnihoRokuPage;
