import PersonCard, { PersonPhones } from "@/components/content/PersonCard";
import { getPeople, isContact } from "@/lib/content/people";

// the page's sections, each one a label in data/people.ts
const SECTIONS = [
  "Učitelé",
  "Asistentky učitelů",
  "Knihovna",
  "Hospodářka, vedoucí školní jídelny",
  "Kuchyň",
  "Správní zaměstnanci",
  "Zástupkyně ředitelky pro MŠ",
  "Mateřská škola - ulice Velkomoravská 409",
  "Mateřská škola - ulice Sokolská",
];

const KontaktyPage = async () => {
  const sections = await Promise.all(SECTIONS.map(async (label) => ({ label, people: await getPeople(label) })));
  return (
    <>
      <div className="body">
        {sections.map(({ label, people }) => (
          <div className="article" key={label}>
            <hr className="article__line" />
            <div className="article__section">
              <h1>{label}</h1>
              <div className="persons">
                {/* the section's own phone number comes first, then the people */}
                {people.filter(isContact).map((contact) => (
                  <PersonPhones key={contact.id} person={contact} withKinds />
                ))}
                {people
                  .filter((person) => !isContact(person))
                  .map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default KontaktyPage;
