import Link from "next/link";

// Ported from html/archiv/materska-skola.html
export default function ArchivMaterskaSkolaPage() {
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
            <h1>Archiv mateřské školy</h1>

            <div className="gallery-list">
              <div className="article__body">
                <h2>2016</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20160518">Poh&#225;dkov&#225; lo&#271; do ZOO Hodon&#237;n 18.5.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160510ms">Hra na indi&#225;ny 10.5.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160504">Hry na zahrad&#283; 4.5.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160429">&#268;arod&#283;jnice 29.4.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160428">Kovosteel Star&#233; M&#283;sto 28.4.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160422">Den Zem&#283; 22.4.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160417">V&#253;stava trofej&#237; 17.4.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160407">U&#269;&#237;me se 7.4.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160330">B&#237;l&#233; Karpaty 30.3.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160322">
                      Velikono&#269;n&#237; hled&#225;n&#237; vaj&#237;&#269;ek 22.3.2016
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160321">Hudebn&#237; program 21.3.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160317">Canisterapie 17.3.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160316">Jarn&#237; poh&#225;dka 16.3.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160311">Karneval 11.3.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160209">Masopust 9.2.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160203">Kouzeln&#237;k a klaun 3.2.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160115">Hodina p&#345;ed&#353;kol&#225;k&#367; 15.1.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160111">N&#225;v&#353;t&#283;va jesli&#269;ek 11.1.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160107">Vych&#225;zka 7.1.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160106">T&#345;i kr&#225;lov&#233; 6.1.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160105">Zima 5.1.2016</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2015</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20151220">Na zahrad&#283; zima-2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151216">Chyst&#225;me se na v&#225;noce 16.12.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151215">Na zahrad&#283; podzim-2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151204">&#268;erti a and&#283;l&#233; 4.12.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151126">Hry ve t&#345;&#237;d&#283; &#345;&#237;jen-2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151102">Canisterapie 2.11.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151021">Dopravn&#237; h&#345;i&#353;t&#283; 21.10.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151001">Divadlo o komin&#237;&#269;kovi 1.10.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150623">ZOO Le&#353;n&#225; 23.6.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150612">Na zmrzlin&#283; 12.6.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150609">Hra na indi&#225;ny 9.6.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150601">N&#225;v&#353;t&#283;va lesn&#237; &#353;kolky 1.6.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150511">Pozorov&#225;n&#237; p&#345;&#237;rody 11.5.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150504">Jaro na zahrad&#283; 4.5.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150422ms">Sb&#283;rn&#253; dv&#367;r 22.4.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150416">Jarn&#237; vych&#225;zky 16.4.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150415">Kovosteel Star&#233; M&#283;sto 15.4.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150324">Velikono&#269;n&#237; hled&#225;n&#237; 24.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150320">Pozorujeme zatm&#283;n&#237; slunce 20.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150316">Na zahrad&#283; 16.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150315">T&#283;locvi&#269;na Z&#352; 15.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150313">Mysliveck&#225; v&#253;stava 13.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150311">Poh&#225;dka se psem 11.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150310">Vystoupen&#237; pro seniory 10.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150225">Radov&#225;nky na sn&#283;hu 25.2.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150221">Karneval 21.2.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150210">Pe&#269;eme Bo&#382;&#237; milosti 10.2.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150204">Ke krmelci 4.2.2015</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2014</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20141205">Mikul&#225;&#353; 5.12.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141105">Pou&#353;t&#283;n&#237; draka 5.11.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141103">Vodic&#237; pes 3.11.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141003ms">Tvo&#345;en&#237; z dyn&#237; 3.10.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141002">Poh&#225;dka 2.10.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141001">Lep&#237;me pap&#237;rov&#233; houby 1.10.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140919ms">D&#283;l&#225;me si sal&#225;t 19.9.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140902">V na&#353;&#237; t&#283;locvi&#269;n&#283; 2.9.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141212">Hry ve t&#345;&#237;d&#283; 2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140616ms">Poh&#225;dkov&#225; lo&#271; 16.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140613ms">V lese 13.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140604">V&#253;let 4.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140530">Den d&#283;t&#237; 30.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140527ms">Vych&#225;zka k podkov&#283; 27.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140527">Slun&#237;&#269;kov&#253; t&#253;den 27.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140526">
                      Pozn&#225;v&#225;me dom&#225;c&#237; zv&#237;&#345;&#225;tka 26.5.2014
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140517">Na&#353;e zahr&#225;dka 17.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140514">T&#283;locvi&#269;na Z&#352; 14.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140513">Jaro u zv&#237;&#345;&#225;tek 13.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140507">N&#225;v&#353;t&#283;va v 1.t&#345;.Z&#352; 7.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140430ms">&#268;arod&#283;jnice 30.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140426">Stav&#283;n&#237; m&#225;je 26.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140423">Na&#353;e t&#283;locvi&#269;na 23.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140416">Velikonoce v M&#352; 16.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140415ms">
                      Tvo&#345;&#237;me p&#345;&#225;n&#237;&#269;ka k Velikonoc&#367;m 15.4.2014
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140414">Vod&#237;c&#237; pes 14.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140404ms">Pom&#225;h&#225;me mlad&#353;&#237;m d&#283;tem 4.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140312">Loutkov&#233; divadlo 12.3.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140228ms">Masopust 28.2.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140227">Kouzeln&#237;k 27.2.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140226">Krmen&#237; kon&#237;ka u Sloup&#367; 26.2.2014</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2013</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20131219ms">
                      V&#225;noce, v&#225;noce p&#345;ich&#225;zej&#237; 19.12.2013
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131218ms">Vystoupen&#237; pro seniory 18.12.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131201">U v&#225;no&#269;n&#237;ho stromku v obci 1.12.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131130ms">V&#237;t&#225;n&#237; ob&#269;ank&#367; 30.11.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131022">Hrab&#225;n&#237; list&#237; na zahrad&#283; 22.10.2013 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130921">Divad&#233;lko v M&#352; 21.9.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130910">Vy&#345;ez&#225;v&#225;n&#237; d&#253;n&#237; 10.9.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130903">Hry na zahrad&#283; 3.9.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130902">Hry ve t&#345;&#237;d&#283; 2.9.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130527">V&#253;let Le&#353;n&#225; 27.5.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130513">Bes&#237;dka pro maminky 13.5.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130430ms">Slet &#269;arod&#283;jnic 30.4.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130424">Koncert 24.4.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130422">Den zem&#283; 22.4.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130406">Hrajeme si na zahrad&#283; 6.4.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130405ms">V&#253;stava myslivc&#367; Hodon&#237;n 5.4.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130313">Vych&#225;zky d&#283;t&#237; do okol&#237; 10.2012-03.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130207">Pe&#269;en&#237; milost&#237; 7.2.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130124">Hry ve t&#345;&#237;d&#283; 24.1.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130123">V lese 22.1.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130117">Zima 17.1.2013 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130115">Divad&#233;lko &#353;ikulka 15.1.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130111">Hrajeme si divadlo 11.1.2013 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130110">S&#225;&#328;kov&#225;n&#237; 10.1.2013</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2012</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20121014">Bramburkov&#225;n&#237; 14.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121009">V t&#283;locvi&#269;n&#283; </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121009">9.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121004">Divadlo Zl&#237;n 4.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121003">Na zahrad&#283; 3.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121002">Mls&#225;me ovocn&#253; dort 2.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120927ms">Str&#225;&#353;&#225;ci z dyn&#237; 27.9.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120911">Z&#225;&#345;&#237; ve &#353;kolce 11.9.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120618">V 1.t&#345;&#237;d&#283; 18.6.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120611">V&#253;let na lodi 11.6.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120601ms_oslava">Oslava ke dni d&#283;t&#237; 1.6.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120601ms_modelky">Na&#353;e modelky 1.6.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120529">V parku u zdravotn&#237;ho st&#345;ediska </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120529">29.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120528">Hrajeme si ve t&#345;&#237;d&#283; 28.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120523">Za babi&#269;kma na penzionu 23.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120517">V&#253;let Le&#353;n&#225; 17.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120516">Kluci v akci 16.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120515">Na zahrad&#283; 15.5.20112</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120510">Bes&#237;dka ke dni matek 10.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120318">Karneval 18.3.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120306">Divad&#233;lko v m&#353; 6.3.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120123">Zima 23.1.2012</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2011</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20111222">V&#225;noce 22.12.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20111107">Pou&#353;t&#283;n&#237; draka 7.11.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110927">Usp&#225;v&#225;n&#237; brou&#269;k&#367; 27.9.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110926">Tvo&#345;en&#237; z dyn&#237; 27.9.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110628">Z&#225;mek Milotice 28.6.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110601">ZOO Le&#353;n&#225; 1.6.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110516">Na&#353;e vych&#225;zky 16.5.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110513">Na penzionu 13.5.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110509">Za zv&#237;&#345;&#225;tky 9.5.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110429ms">&#268;arod&#283;jnice </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110429ms">29.4.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110409">&#268;i&#353;t&#283;n&#237; stud&#225;nek 9.4.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110306">Karneval 6.3.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110124">Zimn&#237; radov&#225;nky 24.1.2011</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2010</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20101119">Usp&#225;v&#225;n&#237; brou&#269;k&#367; 19.11.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101022">Pou&#353;t&#283;n&#237; draka 22.10.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101010">Bramborov&#253; t&#253;den 10.10.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100929">M&#225;m nov&#233; kamar&#225;dy 29.9.2010</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2009</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/skolka">Prohl&#237;dka prostor &#353;kolky 2009</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
