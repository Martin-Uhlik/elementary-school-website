import ContactDirectory from "@/components/content/ContactDirectory";
import { getPeople } from "@/lib/content/people";

// the page's sections, each one a label of people in the database
const SECTIONS = [
  "Učitelé",
  "Školní družiny",
  "Asistentky pedagogů",
  "Knihovna",
  "Vedoucí školní jídelny",
  "Hospodářka",
  "Kuchyň",
  "Správní zaměstnanci",
  "Zástupkyně ředitelky pro MŠ",
  "Mateřská škola - ulice Velkomoravská 409",
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
