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
            <h1>Aktuální informace</h1>
            {news.links.length === 0 ? (
              <p className="empty-note">V současné době zde nejsou žádné aktuality.</p>
            ) : (
              <LinkList links={news.links} columns={1} />
            )}
          </section>

          <section className="article__section">
            <h1>Oznámení</h1>
            <LinkList links={announcements.links} />
          </section>
        </div>

        <section className="article__section">
          <h1>Základní informace</h1>
          <div className="persons">
            {people.map((person) => (
              <PersonCard key={person.id} person={person} variant="short" />
            ))}
          </div>
        </section>

        <section className="article__section main-tour">
          <h1>Videoprohlídka školy</h1>
          <VideoTour />
        </section>

        <section className="sponsors" aria-labelledby="sponsors-title">
          <h2 id="sponsors-title" className="sponsors__title">
            Podporují nás
          </h2>
          <ul className="sponsors__logos">
            {sponsors.map((sponsor) => (
              <li key={sponsor.id}>
                <img src={sponsor.logo} alt={`Logo ${sponsor.name}`} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default HomePage;
