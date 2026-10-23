import HomeCarousel from "@/components/HomeCarousel";
import ScrollArrow from "@/components/ScrollArrow";
import VideoTour from "@/components/VideoTour";
import LinkItem from "@/components/content/LinkItem";
import LinkList from "@/components/content/LinkList";
import PersonCard from "@/components/content/PersonCard";
import { getLinkGroup } from "@/lib/content/links";
import { getPhotos, getSponsors } from "@/lib/content/misc";
import { getPeople, personName } from "@/lib/content/people";

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const HomePage = async () => {
  const people = await getPeople("Základní informace");
  const photos = await getPhotos();
  const sponsors = await getSponsors();
  const news = await getLinkGroup("home-aktualni-informace");
  const announcements = await getLinkGroup("home-oznameni");
  return (
    <>
      <HomeCarousel photos={photos} />
      <ScrollArrow />

      <div className="text-section">
        <img className="background-elem" src="/data/images/background_elements/squares.svg" alt="" />
        <div className="text-subsection">
          <div className="d-flex flex-row">
            <hr className="article__line" />
            <div className="persons">
              <h1>Základní informace</h1>
              {people.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  variant="short"
                  heading={`${capitalize(person.position ?? "")}: ${personName(person)}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-section">
        <div className="text-subsection">
          <div className="d-flex flex-row">
            <hr className="article__line" />
            <div>
              <h1>Aktuální informace</h1>
              <ul className="documents" id="main-page__news">
                {news.links.length === 0 ? (
                  <li className="main-page__news">V současné době zde nejsou žádné aktuality.</li>
                ) : (
                  news.links.map((link) => (
                    <li key={link.id}>
                      <LinkItem link={link} />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="background-elem background-elem-lg"></div>
      </div>

      <div className="text-section">
        <div className="background-elem background-elem-lg">
          <img className="background-elem" src="/data/images/background_elements/lines.svg" alt="" />
        </div>
        <div className="text-subsection">
          <div className="d-flex flex-row">
            <hr className="article__line" />
            <div>
              <h1>Oznámení</h1>
              <LinkList links={announcements.links} />
            </div>
          </div>
        </div>
      </div>
      <img className="background-elem background-elem--right" src="/data/images/background_elements/line.svg" alt="" />

      <div className="main-tour">
        <div className="main-tour_inner">
          <h1>Videoprohlídka školy</h1>
          <hr className="article__line" />
          <VideoTour />
        </div>
      </div>

      <div className="sponsors">
        {sponsors.map((sponsor) => (
          <img key={sponsor.id} src={sponsor.logo} alt={`Logo ${sponsor.name}`} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
