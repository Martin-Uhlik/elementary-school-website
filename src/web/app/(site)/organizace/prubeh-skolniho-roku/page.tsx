import { LuSun } from "react-icons/lu";
import { calendarDateLabel } from "@/lib/content/format";
import { getSchoolYears } from "@/lib/content/misc";

// **text** in the data is shown in bold
const withBold = (text: string) => text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));

const toDate = (iso: string) => new Date(`${iso}T12:00:00`);
const monthFormat = new Intl.DateTimeFormat("cs", { month: "short" });

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
                        <time dateTime={event.date}>{calendarDateLabel(event)}</time>
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
