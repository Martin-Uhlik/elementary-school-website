import ContactDirectory from "@/components/content/ContactDirectory";
import { getPeople } from "@/lib/content/people";

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
    <div className="body">
      <ContactDirectory sections={sections} />
    </div>
  );
};

export default KontaktyPage;
