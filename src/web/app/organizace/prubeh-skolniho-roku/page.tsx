import { getSchoolYear } from "@/lib/content/misc";

// **text** in the data is shown in bold
const withBold = (text: string) => text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));

const OrganizacePrubehSkolnihoRokuPage = async () => {
  const { schoolYear, events } = await getSchoolYear();
  return (
    <>
      <div className="body">
        <div className="article">
          <div className="article__section">
            <h1>Průběh školního roku {schoolYear}</h1>
            <ul className="article__list">
              {events.map((event) => (
                <li key={event.id}>{withBold(event.text)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizacePrubehSkolnihoRokuPage;
