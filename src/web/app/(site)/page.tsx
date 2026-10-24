import Link from "next/link";
import { LuCalendarDays, LuImages, LuPhone, LuScrollText, LuUtensils } from "react-icons/lu";
import HomeCarousel from "@/components/HomeCarousel";
import VideoTour from "@/components/VideoTour";
import HomeDecoration from "@/components/content/HomeDecoration";
import LinkList from "@/components/content/LinkList";
import NewsList from "@/components/content/NewsList";
import PersonCard from "@/components/content/PersonCard";
import { carouselStartScript } from "@/lib/carousel";
import { getLinkGroup } from "@/lib/content/links";
import { getPhotos, getSponsors } from "@/lib/content/misc";
import { getNews } from "@/lib/content/news";
import { getPeople } from "@/lib/content/people";

// shortcuts in the white bar under the photos
const quickLinks = [
  { href: "/uredni-deska", label: "Úřední deska", Icon: LuScrollText },
  { href: "/jidelna", label: "Jídelna", Icon: LuUtensils },
  { href: "/organizace/prubeh-skolniho-roku", label: "Školní rok", Icon: LuCalendarDays },
  { href: "/foto-video", label: "Galerie", Icon: LuImages },
  { href: "/kontakty", label: "Kontakty", Icon: LuPhone },
];

const HomePage = async () => {
  const people = await getPeople("Základní informace");
  const photos = await getPhotos();
  const sponsors = await getSponsors();
  const news = await getNews();
  const announcements = await getLinkGroup("home-oznameni");
  return (
    <>
      <HomeCarousel photos={photos} />
      {/* shows a random photo from the first paint, see lib/carousel.ts */}
      <script dangerouslySetInnerHTML={{ __html: carouselStartScript }} />

      <div className="body body--home">
        <nav className="quick-bar" aria-label="Rychlé odkazy">
          <ul className="quick-bar__list">
            {quickLinks.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link href={href} className="quick-bar__link">
                  <span className="quick-bar__icon" aria-hidden="true">
                    <Icon focusable="false" />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="home-row home-row--right">
          <HomeDecoration shape="squares" />
          <section className="article__section">
            <h1>Základní informace</h1>
            <div className="persons">
              {people.map((person) => (
                <PersonCard key={person.id} person={person} variant="short" />
              ))}
            </div>
          </section>
        </div>

        <div className="home-row home-row--left">
          <HomeDecoration shape="bars" />
          <section className="article__section">
            <h1>Aktuální informace</h1>
            {news.length === 0 ? (
              <p className="empty-note">V současné době zde nejsou žádné aktuality.</p>
            ) : (
              <NewsList news={news} />
            )}
          </section>
        </div>

        <div className="home-row home-row--right">
          <HomeDecoration shape="zigzag" />
          <section className="article__section">
            <h1>Oznámení</h1>
            <LinkList links={announcements.links} />
          </section>
        </div>

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
