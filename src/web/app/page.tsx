import HomeCarousel from "@/components/HomeCarousel";
import ScrollArrow from "@/components/ScrollArrow";
import VideoTour from "@/components/VideoTour";
import LinkList from "@/components/content/LinkList";
import PersonCard from "@/components/content/PersonCard";
import { getLinkGroup } from "@/lib/content/links";
import { getPhotos, getSponsors } from "@/lib/content/misc";
import { getPeople } from "@/lib/content/people";

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

      <div className="body body--home">
        <div className="home-grid">
          <section className="article__section">
            <h1>Základní informace</h1>
            <div className="persons persons--single">
              {people.map((person) => (
                <PersonCard key={person.id} person={person} variant="short" />
              ))}
            </div>
          </section>

          <div className="home-grid__side">
            <section className="article__section">
              <h1>Aktuální informace</h1>
              {news.links.length === 0 ? (
                <p className="empty-note">V současné době zde nejsou žádné aktuality.</p>
              ) : (
                <LinkList links={news.links} columns={1} />
              )}
            </section>

            <section className="article__section">
              <h1>Oznámení</h1>
              <LinkList links={announcements.links} columns={1} />
            </section>
          </div>
        </div>

        <section className="article__section main-tour">
          <h1>Videoprohlídka školy</h1>
          <VideoTour />
        </section>

        <div className="sponsors">
          {sponsors.map((sponsor) => (
            <img key={sponsor.id} src={sponsor.logo} alt={`Logo ${sponsor.name}`} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
