import type { Metadata } from "next";
import { Fragment } from "react";
import { LuSun } from "react-icons/lu";
import { calendarDateLabel, dayLabel, schoolYearOf, todayIso } from "@/lib/content/format";
import { getSchoolYears } from "@/lib/content/misc";
import type { CalendarEvent } from "@/lib/content/types";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/organizace/prubeh-skolniho-roku",
  "Průběh školního roku",
  "Kalendář školního roku na ZŠ a MŠ Moravský Písek: prázdniny, ředitelská volna, akce školy a další důležitá data.",
);

// **text** in the data is shown in bold
const withBold = (text: string) => text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));

const toDate = (iso: string) => new Date(`${iso}T12:00:00`);
const monthFormat = new Intl.DateTimeFormat("cs", { month: "short" });

type EventStatus = "past" | "current" | "upcoming";

// ISO dates compare as strings; an event without endDate lasts one day
const eventStatus = (event: CalendarEvent, today: string): EventStatus => {
  if ((event.endDate ?? event.date) < today) return "past";
  return event.date <= today ? "current" : "upcoming";
};

const itemClass = (event: CalendarEvent, status?: EventStatus) =>
  [
    "timeline__item",
    event.holiday && "timeline__item--holiday",
    status === "past" && "timeline__item--past",
    status === "current" && "timeline__item--current",
  ]
    .filter(Boolean)
    .join(" ");

// The page is rendered per request (db() waits for connection()), so "today" is never baked into cached HTML
const OrganizacePrubehSkolnihoRokuPage = async () => {
  const years = await getSchoolYears();
  const today = todayIso();
  const currentYear = schoolYearOf(today);

  const nowMarker = (
    <li key="dnes" id="dnes" className="timeline__now">
      <span className="timeline__now-label">
        Dnes <time dateTime={today}>{dayLabel(today)}</time>
      </span>
    </li>
  );

  return (
    <>
      <div className="page">
        {years.map(({ schoolYear, events }) => {
          // only the running school year shows where we are
          const isCurrentYear = schoolYear === currentYear;
          const statuses = events.map((event) => (isCurrentYear ? eventStatus(event, today) : undefined));
          const firstNotPast = statuses.findIndex((status) => status !== "past");
          // the marker goes before the first event that is not over yet, or after the last one
          const nowIndex = !isCurrentYear || !events.length ? -1 : firstNotPast === -1 ? events.length : firstNotPast;

          return (
            <div key={schoolYear} className="article">
              <div className="article__section">
                <h1 className="article__title">Průběh školního roku {schoolYear}</h1>
                <ol className="timeline">
                  {events.map((event, i) => (
                    <Fragment key={event.id}>
                      {i === nowIndex && nowMarker}
                      <li
                        className={itemClass(event, statuses[i])}
                        aria-current={statuses[i] === "current" ? "date" : undefined}
                      >
                        <span className="timeline__leaf" aria-hidden="true">
                          <span className="timeline__month">
                            {monthFormat.format(toDate(event.date)).replace(".", "")}
                          </span>
                          <span className="timeline__day">{toDate(event.date).getDate()}</span>
                        </span>
                        <div className="timeline__card">
                          <p className="timeline__date">
                            <time dateTime={event.date}>{calendarDateLabel(event)}</time>
                            {statuses[i] === "current" && (
                              <span className="timeline__badge timeline__badge--now">Právě probíhá</span>
                            )}
                            {event.holiday && (
                              <span className="timeline__badge">
                                <LuSun aria-hidden="true" focusable="false" /> Prázdniny
                              </span>
                            )}
                          </p>
                          <p className="timeline__text">{withBold(event.text)}</p>
                        </div>
                      </li>
                    </Fragment>
                  ))}
                  {nowIndex === events.length && nowMarker}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrganizacePrubehSkolnihoRokuPage;
