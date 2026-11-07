import { LuExternalLink } from "react-icons/lu";
import InfoTooltip from "@/components/content/InfoTooltip";
import { todayIso } from "@/lib/content/format";
import { type Allergen, CANTEEN_MENU_URL, getCanteenMenu, type MenuWeek } from "@/lib/content/canteen";

const dayName = new Intl.DateTimeFormat("cs-CZ", { weekday: "long", timeZone: "UTC" });
const dayDate = new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "numeric", timeZone: "UTC" });

const utc = (date: string) => new Date(`${date}T00:00:00Z`);

// "9. 11. – 13. 11."
const weekRange = (week: MenuWeek) => {
  const first = week.days[0].date;
  const last = week.days.at(-1)!.date;
  return first === last ? dayDate.format(utc(first)) : `${dayDate.format(utc(first))} – ${dayDate.format(utc(last))}`;
};

const StravaLink = ({ children }: { children: string }) => (
  <a href={CANTEEN_MENU_URL} target="_blank" className="canteen-menu__link">
    {children}
    <LuExternalLink className="canteen-menu__link-icon" aria-hidden="true" focusable="false" />
    <span className="visually-hidden"> (externí odkaz)</span>
  </a>
);

// the allergens of a meal in the same note as the documents on the page use, beside the meal's label
const Allergens = ({ kind, allergens }: { kind: string; allergens: Allergen[] }) =>
  allergens.length > 0 && (
    <InfoTooltip
      variant="inline"
      label={`Alergeny: ${kind}`}
      text={["Alergeny:", ...allergens.map((allergen) => `${allergen.code} – ${allergen.name}`)].join("\n")}
    />
  );

// The upcoming menu from strava.cz, a card for every day, by week; a link to strava.cz when it can't be loaded
const CanteenMenu = async () => {
  const weeks = await getCanteenMenu();
  const today = todayIso();
  return (
    <section className="article__section canteen-menu" aria-labelledby="canteen-menu-title">
      <header className="canteen-menu__header">
        <h2 id="canteen-menu-title" className="article__title">
          Jídelníček
        </h2>
        {weeks && weeks.length > 0 && <StravaLink>Jídelníček na strava.cz</StravaLink>}
      </header>

      {!weeks && (
        <p className="canteen-menu__message">
          Jídelníček se teď nepodařilo načíst. Najdete ho na <StravaLink>strava.cz</StravaLink>
        </p>
      )}
      {weeks?.length === 0 && (
        <p className="canteen-menu__message">
          Na další dny zatím jídelníček není zveřejněný. Zkuste to později, nebo se podívejte na{" "}
          <StravaLink>strava.cz</StravaLink>
        </p>
      )}

      {weeks && weeks.length > 0 && (
        <>
          {weeks.map((week) => (
            <div key={week.monday} className="canteen-menu__week">
              <h3 className="canteen-menu__week-title">Týden {weekRange(week)}</h3>
              <ol className="canteen-menu__days">
                {week.days.map((day) => (
                  <li
                    key={day.date}
                    className={day.date === today ? "canteen-menu__day canteen-menu__day--today" : "canteen-menu__day"}
                  >
                    <h4 className="canteen-menu__date">
                      <span className="canteen-menu__weekday">{dayName.format(utc(day.date))}</span>
                      <time dateTime={day.date} className="canteen-menu__day-number">
                        {dayDate.format(utc(day.date))}
                      </time>
                      {day.date === today && <span className="canteen-menu__today">dnes</span>}
                    </h4>
                    <dl className="canteen-menu__meals">
                      {day.meals.map((meal, index) => (
                        <div key={index} className="canteen-menu__meal">
                          <dt className="canteen-menu__kind">
                            {meal.kind}
                            <Allergens kind={meal.kind} allergens={meal.allergens} />
                          </dt>
                          <dd className="canteen-menu__name">{meal.name}</dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default CanteenMenu;
