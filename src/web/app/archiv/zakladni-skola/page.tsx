import Link from "next/link";

// Ported from html/archiv/zakladni-skola.html
const ArchivZakladniSkolaPage = () => {
  return (
    <>
      <div className="gallery-navigation">
        <Link href="/foto-video" className="gallery-navigation__back-arrow">
          <img src="/data/images/icons/arrow-left.svg" alt="šipka zpět" className="gallery-navigation__icon" />
        </Link>
      </div>
      <div className="body gallery-body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Archiv základní školy</h1>

            <div className="gallery-list">
              <div className="article__body">
                <h2>2023</h2>
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
                    <Link href="/galerie/20230324">Pohybové hry s deváťáky 24.3.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230320">V knihovně 20.3.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230319-24">Lyžařský kurz 19.3.-24.3.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230301">ZŠ Domanín 5.tř. 1.3.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230225">Ples školy 25.2.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230222-1">Scénické čtení 22.2.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230222">Robotika 5.tř. 22.2.2023</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20230216">Recitační soutěž 16.2.2023</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2022</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20221222">Vánoce ve škole 22.12.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20221214">Vánoční dílničky 14.12.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20221210">Plavecký výcvik 3.tř. 5.10.-10.12.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20221207">Česko zpívá koledy 7.12.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20221021">Dýňobraní 21.10.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220630">Slavnostní ukončení školního roku 30.6.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220628">Turnaj v přehazované 28.6.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220627">Turnaj ve florbalu 27.6.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220623">Sběr papíru 23.-24.6.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220618">Den obce 18.6.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220614">Výlet Vida Brno 8.AB 14.6.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220603">Život v pohybu 3.6.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220517">Malování koupaliště 9.třída 17.5.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220513">Den bez aktovek 13.5.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220511">Okresní kolo dopravní soutěže v Kyjově 11.5.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220509">Kroužek háčkování 9.5.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220430">Ples školy 30.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220429">Oblastní kolo dopravní soutěže ve Veselí 29.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220426">Dravci Seiferos 26.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220422-1">Den Země 22.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220422">4. třída Den Země 22.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220407">Lesnický den 8.AB Bzenec Přívoz 7.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220405">Zápis do 1. třídy 5.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220401">Noc s Andersenem 1.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220321">Jarní výzdoba školy 21.3.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220114">Scénické čtení 14.1.2022</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2021</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20211221">Bruslení 21.12.2021</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20210414">Výzdoba školy 14.4.2021</Link>
                  </li>
                  <li>
                    <a href="/data/videos/zsmp_compressed_1080.mp4">Videoprohlídka školy 1920x1080</a>
                  </li>
                  <li>
                    <a href="/data/videos/zsmp_compressed_720.mp4">Videoprohlídka školy 1280x720</a>
                  </li>
                  <li>
                    <a href="/data/videos/zsmp_compressed_420.mp4">Videoprohlídka školy 854x480</a>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2020</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20200214">Lyžařský kurz 9.-14.2.2020</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2019</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20191219">6.AB planetárium Brno 19.12.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191211-1">Česko zpívá koledy 11.12.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191211">Andělské Vánoce 11.12.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191205">Mikuláš 5.12.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191125">30 let svobody Horváth Ziggy 25.11.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191115">Knihovna 6. třída - 15.11.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191113_01">Malujeme podchod 13.11.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191113_02">Útulek Hodonín, 13.11.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191113_03">Ptačí budky 7. třída 13.11.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191015">Program Leonardo da Vinci 15.10.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190926">Adaptační výlet 6.AB 26.9.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190913">Atletický den 13.9.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190617">6. třída výlet Lednice 17.6.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190614">8. třída vojenská výzbroj 14.6.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190613">1., 2. třída výlet Milotice 13.6.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190605">Praha 9. třída 4.-5.6.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190531">Husak Quartet 31.5.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190531-1">Deváťáci učí 31.5.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190529">1. stupeň Bouzov, Javoříčské jeskyně 29.5.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190528">Dopravní soutěž BESIP 28.5.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190426">Den Země 26.4.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190329">Noc s Adersenem 29.3.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190228-1">Bruslení 28.2.2019 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190226">Recitační soutěž 26.2.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190208">Karneval 8.2.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190202">Ples 2.2.2019</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2018</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20181221">Vánoce ve škole 21.12.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20181212">Vánoční dílničky 12.12.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20181205">Mikuláš 5.12.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20181109">1. a 9. třída 9.11.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20181028">100 let ČSR 28.10.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180927">Atletický den 2. stupně 27.9.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180927-01">Atletický den 1. stupně 27.9.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180911">Sportovní den Bzenec 11.9.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180622">Branný den 22.6.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180605">Dopravní soutěž Hustopeče krajské kolo 5.6.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180601">Ziggy Horváth ke Dni dětí 1.6.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180525">Dopravní soutěž Strážnice okresní kolo 25.5.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180522">Modrý den 22.5.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180420">Den Země 20.4.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180323">Noc s Andersenem 23.3.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180321">Puntíkatý den 21.3.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180218-23">Lyžařský kurz 18.-23.2.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180120">Ples školy 20.1.2018</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2017</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20171213">Vánoční dílničky 13.12.17</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20171205">Mikuláš 5.12.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20171130zs">Filmový den 30.11.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170927">Atletické závody 27.9.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170630zs">Loučení s 5. třídou 30.6.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170630">Výlet 9. třída 13.-14.6.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170624">Běh Moravským Pískem 24.6.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170623">Den naopak 23.6.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170608">7. třída výlet Ostrava - 8.6.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170602">Máme talent 2.6.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170522">Vystoupení pro rodiče, 5. třída 22.5.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170511">Vídeň 11.5.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170421">Den Země 21.4.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170331zs">Noc s Andersenem 31.3.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170320">Cimbálová muzika Reva 20.3.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170301">Bruslení 1.3.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170218">Ples školy 18.2.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170202">Den masek 2.2.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170207">Recitační soutěž 7.2.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170106">Bobování 5. třída 6.1.2017</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2016</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20161216">5. třída v MŠ 16.12.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20161214">Vánoční dílničky 14.12.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20161102">Vyhlášení literární soutěže 2.11.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160929">Atletické závody 29.9.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160923">Mikulčice 23.9.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160625">Písecký běh 25.6.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160620">Dváťáci učí 20.6.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160617">Motorky 4. třída 17.6.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160615">Vida centrum Brno 15.6.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160602">Den bláznivých brýlí 2.6.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160520">Okresní kolo dopravní soutěže Strážnice 20.5.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160516">Škola v přírodě Radějov 16.-20.5.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160510">Gotika 10.5.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160401">Noc s Andersenem 1.4.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160308">Bruslení 8.3.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160206">Ples školy 6.2.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160123-28">Lyžařský kurz Karlov pod Pradědem, 23-28.1.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160113">Růžový den 13.1.2016</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2015</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20151217">Anthropos 6. třída 17.12.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151209">Vánoce 9.12.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151011">Anglie - Brighton 11.-17.10.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151008">S lesníkem v lese 8.10.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151005">Dravci 5.10.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150918">Atletický den 18.9.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150627">Běh Moravským Pískem 27.6.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150619">Deváťáci učí 19.6.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150612zs">Divadlo ZŠ Domanín 12.6.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150610">Výlet 6.AB Brno 10.6.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150529">Bubny 29.5.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150528">9. třída tablo 28.5.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150527">Ukaž že máš talent 27.5.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150522">Soutěž mladých cyklistů Strážnice 22.5.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150520">Praha 9. třída 20.5.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150423">Velehrad 23.4.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150422">Den Země 22.4.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150327">Noc s Andersenem 27.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150217">Bruslení Uh. Ostroh 17.2.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150131">Ples školy 31.1.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150128">Červený den 28.1.2015 </Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2014</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20141216">Vánoce ve škole 16.12.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141029">Projekt záložka, spolupráce se ZŠ Bratislava, 29.10.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141003">Sázení stromků u hřiště 3.10.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140930zs">Adaptační výlet 6.AB Bzenec, Starý hrad 30.9.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140919">Sportovní den 19.9.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140625">Pasování na čtenáře 1.tř. 25.6.2014 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140620">Plavání 2.tř. a 3.tř. 4.4.-20.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140618">Černobílý den 18.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140616">Výlet žákovského parlamentu - Zoo Hodonín 16.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140616zs">Výlet pohádkovou lodí 1.třída 16.6.2014 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140613">Školní výlet - paintball, 8. a 9. třída 13.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140602">Škola v přírodě Lopeník 2.-6.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140521">Besídka pro rodiče 2.třídy 21.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140516">Soutěž mladých cyklistů Strážnice 16.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140515">Exkurze Osvětim 15.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140415">2. třída na zámku Milotice, 15.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140425">1. třída Kovosteel 25.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140406">Stuha 6.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140404zs">Noc s Andersenem 4.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140319">1. třída s MŠ, Škola nanečisto 19.3.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140223-28">Lyžařský kurz Kralický Sněžník 23.-28.2.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140222">Ples školy 22.2.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140212">Recitační soutěž 12.2.2014</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2013</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20131220">V&#225;no&#269;n&#237; turnaj 20.12.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131219">Dev&#225;&#357;&#225;ci a prv&#225;ci 19.12.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131217">D&#237;lni&#269;ky 17.12.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131205">Mikul&#225;&#353; 5.12.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131122">Betl&#233;my 22.11.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131101">Oran&#382;ov&#253; den 1.11.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130927">Sportovn&#237; den 27.9.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130919">Archeoskanzen Modr&#225; 19.9.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130626">Little Red Riidding Hood 26.6.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130625">
                      Z&#225;v&#283;re&#269;n&#233; setk&#225;n&#237; 1.+9. t&#345;&#237;dy 25.6.2013
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130614">
                      Den otev&#345;en&#253;ch dve&#345;&#237; P&#268;R Hodon&#237;n 14.6.2013
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130608">B&#283;h Moravsk&#253;m P&#237;skem 8.6.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130607a">Pasov&#225;n&#237; &#269;ten&#225;&#345;&#367; 7.6.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130607">V&#253;let 6B lasergame Brno 7.6.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130524">Fotografov&#225;n&#237; t&#345;&#237;d 24.5.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130516">Exkurze V&#237;de&#328; 16.5.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130510">Bes&#237;dka ke Dni matek 10.5.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130509">P&#345;ehazovan&#225; turnaj d&#283;v&#269;at 9.5.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130405">Noc s Andersenem 5.4.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130315">Na kole d&#283;tem 15.3.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130223">&#352;koln&#237; ples 23.2.2013</Link>
                  </li>
                  <li>
                    <a href="https://www.dailymotion.com/video/xxsx0b_ykolni-ples-zy-moravsky-pisek-2013-poloneza_creation?search_algo=2#.US9R31dKY5Y">
                      &#352;koln&#237; ples 23.2.2013 video
                    </a>
                  </li>
                  <li>
                    <Link href="/galerie/20130205">Recita&#269;n&#237; sout&#283;&#382; 5.2.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130125s">Zdrav&#225; v&#253;&#382;iva 25.1.2013</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2012</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20121221">V&#225;no&#269;n&#237; bes&#237;dka-turnaj 21.12.2012 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121221s">Zp&#237;v&#225;n&#237; na schodech 21.12. 2012 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121219">Tvo&#345;iv&#233; d&#237;lni&#269;ky 19.12.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121217">V&#225;no&#269;n&#237; tvo&#345;en&#237; 17.12.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121130a">M&#352; v 1.t&#345;. 30.11.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121127">
                      Pou&#353;t&#283;n&#237; drak&#367; 1.+9. t&#345;&#237;dy 27.11.2012{" "}
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121102">Co nepat&#345;&#237; do popelnice 2.11.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121029">Sezn&#225;men&#237; 1. a 9. t&#345;. 29.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121023">P&#345;edn&#225;&#353;ka 23.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121020">Veselsk&#253; poh&#225;r v modern&#237; gymnastice 20.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121002a">Barvy p&#345;&#237;rody 2.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120921s">Skanzen Podzim na d&#283;din&#283; 21.9.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120914">Kr&#225;l&#237;&#269;ci u Matou&#353;k&#367; 14.9.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120912">Archeoskanzen Modr&#225; 12.9.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120611s">&#352;kola v p&#345;&#237;rod&#283; 11.-15.6.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120601">&#352;koln&#237; akademie 1.6.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120518">V&#253;tvarn&#225; sout&#283;&#382; Prittel 18.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120517s">V&#253;let Le&#353;n&#225; 1.t&#345;&#237;da 17.5 2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120504">Dopravn&#237; sout&#283;&#382; 4.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120502">Zdravotnick&#225; z&#225;chrann&#225; slu&#382;ba 2.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120402">Dravci 2.4.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120330">Noc s Andersenem 30.3.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120321">Bruslen&#237; 21.3.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120225">Ples &#353;koly 25.2.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120120">Ly&#382;a&#345;sk&#253; kurz Prad&#283;d 15.-20.1.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120116">Z&#225;pis do prvn&#237; t&#345;&#237;dy 16.1.2012</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2011</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20111221">Ve&#269;er pln&#253; and&#283;l&#367; 21.12.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20111116">Draki&#225;da 16.11.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20111025">Fialov&#253; den 25.10.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110909">D&#253;&#328;ov&#253; b&#225;l 9.9.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110901">Zah&#225;jen&#237; &#353;koln&#237;ho roku 1.9.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110610">Tablo 9.B t&#345;&#237;dy 10.6.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110608">
                      Krajsk&#233; kolo dopravn&#237; sout&#283;&#382;e Oslavany 7.-8.6.2011
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110606">Tablo 9.A t&#345;&#237;dy 6.6.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110603">V&#253;let 9.B Pomez&#237; 2.-3.6.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110527">Dopravn&#237; sout&#283;&#382; 27.5.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110512">Exkurze Brno, 4.+5.t&#345;. 12.5.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110415">V&#253;stava "velikonoce" 15.4.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110405">
                      V&#253;tvarn&#225; sout&#283;&#382;, n&#225;v&#353;t&#283;va Mark&#233;ty Konvi&#269;kov&#233;
                      5.4.2011
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110401">Noc s Adersenem 1.4.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110311">Cimb&#225;lov&#225; muzika R&#201;VA 11.3.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110222">Recita&#269;n&#237; sout&#283;&#382; 22.2.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110212">&#352;koln&#237; ples 12.2.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110203">Zelen&#253; den 3.2.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110120">Z&#225;pis do prvn&#237; t&#345;&#237;dy 20.1.2011</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2010</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20101220">
                      V&#225;no&#269;n&#237; stolov&#225;n&#237; 8.t&#345;. 20.12.2010
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101215">
                      Josef Lada v&#253;stava v Uhersk&#233;m Hradi&#353;ti 15.12.2010
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101203">Miluk&#225;&#353; 3.12.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100906">Lidov&#233; tance 6.9.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100621">Bes&#237;dka pro rodi&#269;e 21.6.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100611">V&#253;let 8.B Ro&#382;nov p.R. 10-11.6.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100528">&#352;kola v p&#345;&#237;rod&#283; 24.-28.5.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100524">Dopravn&#237; sout&#283;&#382; krajsk&#233; kolo 24.5.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100511">
                      T&#345;&#237;d&#237;me a zpracov&#225;v&#225;me odpad 8.AB d&#237;vky 11.5.2010
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100507">V&#253;stava vl&#225;&#269;k&#367; 7.5.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100505">Dopravn&#237; sout&#283;&#382;, okresn&#237; kolo 5.5.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100410">
                      Slavnostn&#237; otev&#345;en&#237; v&#237;ce&#250;&#269;elov&#233;ho h&#345;i&#353;t&#283;
                      10.4.2010
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100409">Plav&#225;n&#237; 2. a 3. t&#345;&#237;da 9.4.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100326">Noc s Adersenem 26.-27.3.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100311">Kouzeln&#237;k Kellner 11.3.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100226">Ly&#382;a&#345;sk&#253; kurz 21.-26.2.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100213">&#352;koln&#237; ples 13.2.2010</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2009</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/skola">Prostor &#353;koly 2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20091204">Mikul&#225;&#353; 4.12.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20090620">150. v&#253;ro&#269;&#237; &#353;koly 20.6.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20090608">Coca cola cup 8.6.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20090603">Coca cola cup 3.6.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20090601">V&#253;let 9.B 1.-2.6.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20090521">Coca cola cup 21.5.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20090416">Coca cola cup 16.4.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20090403">Noc s Andersenem 3.4.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20090208">Ly&#382;a&#345;sk&#253; kurz 8.-13.2.2009</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2008</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20081215">Stolov&#225;n&#237; 9.AB 15.-16.12.2008</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20081104">ZOO Hodon&#237;n 4.11.2008</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20081103">Pou&#353;t&#283;n&#237; drak&#367; 3.11.2008</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20081020">Dev&#225;&#357;&#225;ci a prv&#328;&#225;ci 20.10.2008</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20080328">Noc s Andersenem 28.3.2008</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20080203">Ly&#382;a&#345;sk&#253; kurz 3.-8.2.2008</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2007</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20071221">V&#225;noce ve &#353;kole 21.12.2007</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20071205">Mikul&#225;&#353; 5.12.2007</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20070330">Noc s Andersenem 30.3.2007</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchivZakladniSkolaPage;
