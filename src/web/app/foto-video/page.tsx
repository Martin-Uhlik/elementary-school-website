import Link from "next/link";

// Ported from html/foto-video.html
const FotoVideoPage = () => {
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Galerie</h1>
            <div className="article__split">
              <div className="article__body">
                <h2>Škola</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20231205">Mikuláš 5.12.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20231121">Den bez batohů 21.11.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20231108">Anthropos 6.AB 8.11.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20231102">Den halloweenských masek a kostýmů 2.11.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230929">Atletický den 29.9.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230908">Adaptační výlet 6.AB 8.9.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230627">Veslařský klub Hodonín 3.tř. 27.6.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230621">Deváťáci učí 21.6.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230617">Běh Moravským Pískem 17.6.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230614">Veselský park, naučná vycházka 3.tř. 14.6.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230606">Exkurze Kladíkov 3.tř. 6.6.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230601-0531">Výlet Praha 9.A 31.5.-1.6.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230502-05">Barevný týden 2.-5.5.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230504">Sázení stromků 5. třída 4.5.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230421">Den Země 9.A 21.4.2023</Link>
                  </li>
                </ul>
              </div>
              <div className="article__body">
                <h2>Družina</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20231130">Listopadové počasí 30.11.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20231031">Procházka přírodou 31.10.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230930">Zářijová zábava 30.9.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230630">Máme rádi přírodu 30.6.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230531">Květnová pohoda 31.5.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230331">Vítáme jaro 31.3.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230228">Únor plný zábavy 28.2.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230131">Lednové tvoření 31.1.2023</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Archiv</h1>
            <div className="article__body">
              <ul className="documents">
                <li>
                  <Link href="/archiv/zakladni-skola">Archiv základní školy</Link>
                </li>
                <li>
                  <Link href="/archiv/materska-skola">Archiv mateřské školy</Link>
                </li>
                <li>
                  <Link href="/archiv/druzina">Archiv družiny</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FotoVideoPage;
