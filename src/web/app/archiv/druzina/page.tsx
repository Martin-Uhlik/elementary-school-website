import Link from "next/link";

// Ported from html/archiv/druzina.html
const ArchivDruzinaPage = () => {
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
            <h1>Archiv družiny</h1>

            <div className="gallery-list">
              <div className="article__body">
                <h2>2023</h2>
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

              <div className="article__body">
                <h2>2022</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20221221">Zimní a vánoční čas 21.12.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20221130">Předvánoční čas 30.11.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20221031">Podzimní radosti 31.10.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220930">Barevný podzim 30.9.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220529">Letní hrátky 29.6.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220531">Květen 31.1.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220428">Duben 28.4.2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220331">Únor a březen 2022</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20220131">Leden 2022</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2021</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20211222">Prosincové aktivity 22.12.2021</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20211130">Listopadová zábava 30.11.2021</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20211031">Strašidelný říjen 31.10.2021</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20210930">Barevný podzim 30.9.2021</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20210630">Končí školní rok 30.6.2021</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20210531">Květnové dny 31.5.2021</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20210228">Mrazivý únor 28.2.2021</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20210131">Zimní práce a radovánky 31.1.2021</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2020</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20201217">Prosincové tvoření a zábava 17.12.2020</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20200626">Činnost školní družiny 25.5.-26.6.2020</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20200229">Únorové tvoření 29.2.2020</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20200131">Zimní aktivity 31.1.2020</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2019</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20191220">Vánoční pohoda 20.12.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191130">Listopadový čas 30.11.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20191031">Zábavný a hravý říjen 31.10.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190930">Září už je tady 30.9.2019</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20190131">Zimní práce a radovánky 31.1.2019</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2018</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20181220">Vánoční těšení 20.12.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20181130">Příprava na vánoce 30.11.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20181031">Podzimní čas 31.10.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180930">Zářijové dovádění 30.9.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180630">Veselé červnové dny 30.6.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180531">Jaro plné sluníčka 31.5.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180430">Slunečný duben 30.4.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180330">Březnové práce, exkurze a výstavy 30.3.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180228">Únorové aktivity 28.2.2018</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20180131">Leden plný zábavy 31.1.2018</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2017</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20171222">Vánoční čas 22.12.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20171130">Listopadové tvoření 30.11.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20171031">Říjnová tvorba 31.10.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170930">Vzpomínky na léto 30.9.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170630">Akční červen 30.6.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170531">Květen plný zábavy 31.5.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170526">Vycházka na cyklostezku 26.5.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170512">Vycházka na konvalinky 12.5.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170428">Měsíc duben 28.4.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170331">Velikonoční tvoření 31.3.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170228">Pracovitý únor 28.2.2017</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20170131">Zimní radovánky 31.1.2017</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2016</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20161231">Vánoční čas 31.12.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20161130">Něco málo z listopadu 30.11.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20161031">Říjnové tvoření 31.10.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160930">Práce, ta nás baví 30.9.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160630">Těšíme se na prázdniny 30.6.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160531">Květnové tvoření 31.5.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160430">Veselé dubnové dny 30.4.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160331">Jaro mezi námi 31.3.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160229">Nápaditý únor 29.2.2016</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20160128">Lednové hrátky 28.1.2016</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2015</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20151218">V&#225;no&#269;n&#237; &#269;as 18.12.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151130">&#381;ijeme s p&#345;&#237;rodou 30.11.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20151031">Radosti podzimu 31.10.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150531">Pr&#225;ce i z&#225;bava 31.5.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150430">Jarn&#237; hr&#225;tky 30.4.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150331">Vol&#225;n&#237; jara 31.3.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150227">Zima na pap&#237;&#345;e 27.2.2015</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20150130">Lednov&#233; pr&#225;ce 30.1.2015</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2014</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20141219">V&#225;noce se bl&#237;&#382;&#237; 19.12.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20141031">Podzimn&#237; radosti 31.10.2014 </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140930">U&#382; to zase za&#269;alo 30.9.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140627">T&#283;&#353;&#237;me se na pr&#225;zdniny 27.6.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140531">Barevn&#253; kv&#283;ten 31.5.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140430">Velikono&#269;n&#237; &#269;as 30.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140404">V&#253;stava mysliveck&#253;ch trofej&#237; Kyjov 4.4.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140331">Jarn&#237; hr&#225;tky 31.3.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140228">Pr&#225;ce co n&#225;s bav&#237; 28.2.2014</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20140131">Jak na nov&#253; rok, tak po cel&#253; rok 31.1.2014</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2013</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20131218">V&#225;noce jsou tady 18.12.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131130">Tvo&#345;iv&#253; listopad 30.11.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20131031">Podzimn&#237; sv&#283;t 31.10.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130930">Za&#269;ali jsme zvesela 30.9.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130925">
                      V&#253;let do netradi&#269;n&#237; ZOO Star&#233; M&#283;sto u UH 25.9.2013
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130630">Z&#225;bava p&#345;ed pr&#225;zdninami 30.6.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130531">Pr&#225;ce i z&#225;bava 31.5.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130430">Pr&#225;ce a exkurze 30.4.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130331">B&#345;ezen- m&#283;s&#237;c jara 31.3.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130228">Z&#225;bava a dobroty 28.2.2013</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20130131">Lednov&#233; radov&#225;nky 31.1.2013</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2012</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20121220">Spole&#269;n&#283; se bav&#237;me 20.12.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121130">Pr&#225;ce n&#225;m jde od ruky 30.11.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20121031">Znaky podzimu a jeho dary 31.10.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120927">Draki&#225;da 27.9.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120921">Za&#269;&#225;tek &#353;koly a podzimu 21.9.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120630">&#268;erven pln&#253; z&#225;bavy 30.6.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120531">Jaro v pln&#233;m proudu 31.5.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120430">Duben 30.4.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120329">Hola, hola, p&#345;&#237;roda vol&#225; 29.3.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120309">Kyjov 9.3.2012</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120229">
                      Kdo chce dob&#345;e pracovat, mus&#237; se i stravovat 29.2.2012
                    </Link>
                  </li>
                  <li>
                    <Link href="/galerie/20120123">Znaky zimy 31.1.2012</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2011</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20111223">Prosincov&#233; pr&#225;ce d&#283;t&#237; 23.12.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20111130">M&#225;me &#353;ikovn&#233; ru&#269;i&#269;ky 30.11.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20111031">Podzimn&#237; z&#225;bava 31.10.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110930">Dary p&#345;&#237;rody 30.9.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110629">Bav&#237;me se s p&#345;&#237;rodou 29.6.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110531">Zelen&#225; je tr&#225;va 31.5.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110429">Jarn&#237; sv&#225;tky a bezpe&#269;nost 29.4.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110331">Jaro u&#382; je tady 31.3.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110217">Bez pr&#225;ce nejsou kol&#225;&#269;e 17.2.2011</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20110127">Ani v lednu nezah&#225;l&#237;me 27.1.2011</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2010</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20101202">Mikulášká besídka 2.12.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101129">První sníh 29.11.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101115">Naše šikovné ručičky 15.11.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101008">Pouštění draků 8.10.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101001-30">Práce dětí, říjen</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20101003">Společné chvilky - práce 3.10.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100924">Toulky přírodou 24.9.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100610">Hledání pokladu 10.6.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100607">Plavání 7.6.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100330">Odlitky zvířecích stop 30.3.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100319">Máme rádi zvířata 19.3.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100225">Vaření je hra 25.2.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100209">Obecní knihovna 9.2.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100116">ZimnÍ tvorba 16.1.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100202">BruslenÍ 2.2.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100121">Stavění sněhuláků 21.1.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100116">Zimní tvorba 16.1.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100112">Pěvecká soutěž Jarabáček 12.1.2010</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20100108">Sáňkování 8.1.2010</Link>
                  </li>
                </ul>
              </div>

              <div className="article__body">
                <h2>2009</h2>
                <ul className="documents">
                  <li>
                    <Link href="/galerie/20091211">Keramická dílna 11.12.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20091125">Zdobení perníčků 25.11.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20091123">Fotogalerie činností 23.11.2009</Link>
                  </li>
                  <li>
                    <Link href="/galerie/20091100">Jsem malý, ale šikovný</Link>
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

export default ArchivDruzinaPage;
