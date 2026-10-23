import { LuMail, LuPhone, LuSmartphone } from "react-icons/lu";
import type { Person, Phone } from "@/data/types";
import { personName, PHONE_KIND_LABELS } from "@/lib/content/people";

type Props = {
  person: Person;
  // full: everything, as on /kontakty; short: outside phone numbers, e-mail and job title
  variant?: "full" | "short";
  // heading level of the name, 3 where the card sits under a section heading
  level?: 2 | 3;
  // a line shown under the name, e.g. how to reach the person
  note?: string;
};

const PhoneIcon = ({ kind }: { kind: "landline" | "mobile" }) => {
  const Icon = kind === "mobile" ? LuSmartphone : LuPhone;
  return <Icon className="person-card__icon" aria-hidden="true" focusable="false" />;
};

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
            <PhoneIcon kind={phone.kind} />
            <span className="visually-hidden">{PHONE_KIND_LABELS[phone.kind]} telefon: </span>
            {phone.number}
          </a>
        </li>
      ))}
      {withInternal && internal && <li className="person-card__internal">vnitřní linka {internal.number}</li>}
    </>
  );
};

const PersonCard = ({ person, variant = "full", level = 2, note }: Props) => {
  const Heading = level === 3 ? "h3" : "h2";
  const full = variant === "full";
  const { initials, tone } = avatar(person);
  return (
    <article className="person-card">
      <header className="person-card__header">
        <span className={`person-card__avatar text-${tone}-emphasis bg-${tone}-subtle`} aria-hidden="true">
          {initials}
        </span>
        <div>
          <Heading className="person-card__name">{personName(person)}</Heading>
          {person.position && <p className="person-card__position">{person.position}</p>}
        </div>
      </header>
      {note && <p className="person-card__note">{note}</p>}
      <ul className="person-card__contacts">
        {person.email && (
          <li>
            <a href={`mailto:${person.email}`} className="person-card__contact">
              <LuMail className="person-card__icon" aria-hidden="true" focusable="false" />
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
