import Link from "next/link";
import GalleryList from "@/components/content/GalleryList";
import { getLatestGalleries } from "@/lib/content/galleries";

const FotoVideoPage = async () => {
  const school = await getLatestGalleries("zs", 15);
  const afterSchool = await getLatestGalleries("druzina", 8);
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
                <GalleryList galleries={school} />
              </div>
              <div className="article__body">
                <h2>Družina</h2>
                <GalleryList galleries={afterSchool} />
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
