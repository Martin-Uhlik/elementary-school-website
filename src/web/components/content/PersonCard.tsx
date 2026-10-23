import type { Person } from "@/data/types";
import { personName, PHONE_KIND_LABELS } from "@/lib/content/people";

type Props = {
  person: Person;
  // full: everything, as on /kontakty; short: outside phone numbers, e-mail and job title
  variant?: "full" | "short";
  // heading instead of the name, e.g. "Ředitelka: Mgr. Ivana Uhlíková"
  heading?: string;
};

export const PersonPhones = ({ person, withKinds }: { person: Person; withKinds: boolean }) => {
  // the internal extension only makes sense with the other numbers next to it
  const phones = (person.phones ?? []).filter((phone) => withKinds || phone.kind !== "internal");
  if (phones.length === 0) return null;
  return (
    <div className="phone">
      <span className="phone__label">tel.:</span>
      <div className="phone__numbers">
        {phones.map((phone) => (
          <span className="phone__number" key={phone.number}>
            {withKinds ? `${PHONE_KIND_LABELS[phone.kind]}: ${phone.number}` : phone.number}
          </span>
        ))}
      </div>
    </div>
  );
};

const PersonCard = ({ person, variant = "full", heading }: Props) => {
  const full = variant === "full";
  return (
    <div className="person">
      <h2 className="h2">{heading ?? personName(person)}</h2>
      {person.email && (
        <div className="email">
          <span className="email__label">e-mail:</span>
          <div className="email__links">
            <a href={`mailto:${person.email}`}>{person.email}</a>
          </div>
        </div>
      )}
      <PersonPhones person={person} withKinds={full} />
      {full
        ? person.description?.map((line) => <span key={line}>{line}</span>)
        : !heading && person.position && <span>{person.position}</span>}
    </div>
  );
};

export default PersonCard;
