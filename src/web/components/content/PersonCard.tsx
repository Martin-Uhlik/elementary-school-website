import type { Person, Phone } from "@/data/types";
import { personName, PHONE_KIND_LABELS } from "@/lib/content/people";

type Props = {
  person: Person;
  // full: everything, as on /kontakty; short: outside phone numbers, e-mail and job title
  variant?: "full" | "short";
};

const ICONS = {
  email:
    "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z",
  landline:
    "M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z",
  mobile:
    "M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
};

const Icon = ({ path }: { path: string }) => (
  <svg className="person-card__icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d={path} />
  </svg>
);

const AVATAR_TONES = ["primary", "success", "danger", "warning", "info"];

// initials and a colour that stays the same for a person
const avatar = (person: Person) => {
  const initials =
    person.firstName && person.lastName ? person.firstName[0] + person.lastName[0] : personName(person)[0];
  const hash = [...person.id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return { initials, tone: AVATAR_TONES[hash % AVATAR_TONES.length] };
};

const telHref = (number: string) => `tel:+420${number.replace(/\s/g, "")}`;

// Dialable numbers as links; the internal extension only as text, it only works inside the school
export const PersonPhones = ({ person, withInternal }: { person: Person; withInternal: boolean }) => {
  const phones = person.phones ?? [];
  const internal = phones.find((phone) => phone.kind === "internal");
  const outside = phones.filter((phone): phone is Phone & { kind: "landline" | "mobile" } => phone.kind !== "internal");
  return (
    <>
      {outside.map((phone) => (
        <li key={phone.number}>
          <a href={telHref(phone.number)} className="person-card__contact">
            <Icon path={ICONS[phone.kind]} />
            <span className="visually-hidden">{PHONE_KIND_LABELS[phone.kind]} telefon: </span>
            {phone.number}
          </a>
        </li>
      ))}
      {withInternal && internal && <li className="person-card__internal">vnitřní linka {internal.number}</li>}
    </>
  );
};

const PersonCard = ({ person, variant = "full" }: Props) => {
  const full = variant === "full";
  const { initials, tone } = avatar(person);
  return (
    <article className="person-card">
      <header className="person-card__header">
        <span className={`person-card__avatar text-${tone}-emphasis bg-${tone}-subtle`} aria-hidden="true">
          {initials}
        </span>
        <div>
          <h2 className="person-card__name">{personName(person)}</h2>
          {person.position && <p className="person-card__position">{person.position}</p>}
        </div>
      </header>
      <ul className="person-card__contacts">
        {person.email && (
          <li>
            <a href={`mailto:${person.email}`} className="person-card__contact">
              <Icon path={ICONS.email} />
              <span className="visually-hidden">e-mail: </span>
              {person.email}
            </a>
          </li>
        )}
        <PersonPhones person={person} withInternal={full} />
      </ul>
      {full && person.description && (
        <div className="person-card__description">
          {person.description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
    </article>
  );
};

// The phone numbers of a place (a "Kontakt" entry) shown above the people of its section
export const ContactCard = ({ contact }: { contact: Person }) => (
  <aside className="person-card person-card--contact" aria-label={`Telefon: ${personName(contact)}`}>
    <ul className="person-card__contacts">
      <PersonPhones person={contact} withInternal />
    </ul>
  </aside>
);

export default PersonCard;
