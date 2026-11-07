import type { Metadata } from "next";
import HomeCarousel from "@/components/HomeCarousel";
import InlineScript from "@/components/InlineScript";
import VideoTour from "@/components/VideoTour";
import HomeTrail from "@/components/content/HomeTrail";
import LinkList from "@/components/content/LinkList";
import NewsList from "@/components/content/NewsList";
import PersonCard from "@/components/content/PersonCard";
import { carouselStartScript } from "@/lib/carousel";
import { getLinkGroup } from "@/lib/content/links";
import { getPhotos, getSponsors } from "@/lib/content/misc";
import { getNews } from "@/lib/content/news";
import { getPeople } from "@/lib/content/people";
import { SHARE_IMAGE, SITE_DESCRIPTION, SITE_NAME, schoolJsonLd } from "@/lib/seo";

const TITLE = "Základní škola a Mateřská škola, Moravský Písek";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: SITE_NAME,
    url: "/",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

const HomePage = async () => {
  const people = await getPeople("Základní informace");
  const photos = await getPhotos();
  const sponsors = await getSponsors();
  const news = await getNews();
  const announcements = await getLinkGroup("home-oznameni");
  return (
    <>
      {/* "<" escaped so text from the data can never close the script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeCarousel photos={photos} />
      {/* shows a random photo from the first paint, see lib/carousel.ts */}
      <InlineScript code={carouselStartScript} />

      <div className="page page--home">
        <HomeTrail />
        {/* white bar that overlaps the bottom edge of the photos */}
        <div className="home-title">
          <img className="home-title__logo" src="/data/images/logo.png" alt="" />
          <h1 className="home-title__name">
            Základní škola a Mateřská škola
            <span className="home-title__place">Moravský Písek, příspěvková organizace</span>
          </h1>
        </div>

        <div className="home-row home-row--right">
          <div className="home-row__side" />
          <section className="article__section article__section--bare">
            <h2 className="article__title">Základní informace</h2>
            <div className="persons">
              {people.map((person) => (
                <PersonCard key={person.id} person={person} variant="short" />
              ))}
            </div>
          </section>
        </div>

        <div className="home-row home-row--left">
          <div className="home-row__side" />
          <section className="article__section article__section--bare">
            <h2 className="article__title">Aktuální informace</h2>
            {news.length === 0 ? (
              <p className="empty-note">V současné době zde nejsou žádné aktuality.</p>
            ) : (
              <NewsList news={news} />
            )}
          </section>
        </div>

        <div className="home-row home-row--right">
          <div className="home-row__side" />
          <section className="article__section article__section--bare">
            <h2 className="article__title">Oznámení</h2>
            <LinkList links={announcements.links} />
          </section>
        </div>

        <section className="article__section article__section--bare main-tour">
          <h2 className="article__title main-tour__title">Videoprohlídka školy</h2>
          <VideoTour />
        </section>

        <section className="sponsors" aria-labelledby="sponsors-title">
          <h2 id="sponsors-title" className="sponsors__title">
            Podporují nás
          </h2>
          <ul className="sponsors__logos">
            {sponsors.map((sponsor) => (
              <li key={sponsor.id}>
                <img className="sponsors__logo" src={sponsor.logo} alt={`Logo ${sponsor.name}`} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default HomePage;
