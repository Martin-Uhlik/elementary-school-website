import HomeCarousel from "@/components/HomeCarousel";
import ScrollArrow from "@/components/ScrollArrow";
import VideoTour from "@/components/VideoTour";

type Person = { title: string; phones: string[]; email: string };

const people: Person[] = [
  { title: "Ředitelka: Mgr. Ivana Uhlíková", phones: ["518 698 574"], email: "uhlikova@zsmp.cz" },
  { title: "Zástupkyně ředitelky: Mgr. Kateřina Vařechová", phones: ["518 698 576"], email: "varechova@zsmp.cz" },
  {
    title: "Mateřská škola - zástupkyně ředitelky pro MŠ: Mgr. Jana Zezulová",
    phones: ["739 357 820"],
    email: "zezulova@zsmp.cz",
  },
  {
    title: "Hospodářka, vedoucí školní jídelny: Jana Petruchová",
    phones: ["518 698 571", "739 357 890"],
    email: "petruchova@zsmp.cz",
  },
  { title: "Školník: Jaroslav Lovecký", phones: ["602 723 104"], email: "lovecky.4@seznam.cz" },
  { title: "Správce haly: Pavlína Šantavá", phones: ["734 141 727"], email: "santava@zsmp.cz" },
];

// "Aktuální informace"; a placeholder is shown when empty
const news: { href: string; label: string }[] = [];

const announcements = [
  { href: "/dokument/pristupnost.doc", label: "Prohlášení o přístupnosti" },
  { href: "/dokument/2021_dou%C4%8Dov%C3%A1n%C3%AD.doc", label: "Doučování žáků" },
  {
    href: "/dokument/2021_Desatero%20pro%20prim%C3%A1rn%C3%AD%20prevenci.doc",
    label: "Zapojení do projektu “Desatero pro primární prevenci”",
  },
  { href: "/dokument/2023_pronajem.doc", label: "Pronájem jazykové učebny" },
  { href: "/dokument/20230308_digitalizaceskoly.doc", label: "Digitalizujeme školu" },
  { href: "https://zsmp.edupage.org/", label: "Rozvrh a suplování" },
];

const sponsors = [
  { src: "/data/images/sponsors/fruit.png", alt: "Logo Ovoce do škol" },
  { src: "/data/images/sponsors/presafe.png", alt: "Logo Presafe" },
  { src: "/data/images/sponsors/eu.png", alt: "Logo EU" },
  { src: "/data/images/sponsors/msmt.png", alt: "Logo MŠMT" },
];

const HomePage = () => {
  return (
    <>
      <HomeCarousel />
      <ScrollArrow />

      <div className="text-section">
        <img className="background-elem" src="/data/images/background_elements/squares.svg" alt="" />
        <div className="text-subsection">
          <div className="d-flex flex-row">
            <hr className="article__line" />
            <div className="persons">
              <h1>Základní informace</h1>
              {people.map((person) => (
                <div className="person" key={person.email}>
                  <h2 className="h2">{person.title}</h2>
                  <div className="phone">
                    <span className="phone__label">tel.:</span>
                    <div className="phone__numbers">
                      {person.phones.map((phone) => (
                        <span className="phone__number" key={phone}>
                          {phone}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="email">
                    <span className="email__label">e-mail:</span>
                    <div className="email__links">
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                    </div>
                  </div>
                </div>
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
                {news.length === 0 ? (
                  <li className="main-page__news">V současné době zde nejsou žádné aktuality.</li>
                ) : (
                  news.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} target="_blank">
                        {item.label}
                      </a>
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
              <ul className="documents">
                {announcements.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
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
          <img key={sponsor.src} src={sponsor.src} alt={sponsor.alt} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
