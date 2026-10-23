// Ported from html/organizace/rada-skoly.html
export default function OrganizaceRadaSkolyPage() {
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Rada školy</h1>
            <span>
              Školská rada se zřizuje podle zákona č.561/2004 Sb. při základních, středních a vyšších odborných školách.
            </span>
            <ul>
              <li>
                školská rada je orgán školy umožňující zákonným zástupcům nezletilých žáků, pedagogickým pracovníkům
                školy a zřizovateli a dalším osobám podílet se na správě školy
              </li>
              <li>
                školskou radu zřizuje zřizovatel, který zároveň stanoví počet jejích členů a vydá její volební řád
              </li>
              <li>školská rada zasedá nejméně 2x ročně</li>
              <li>se vyjadřuje k návrhům školních vzdělávacích programů a k jejich následnému uskutečňování</li>
              <li>schvaluje výroční zprávu o činnosti školy</li>
              <li>schvaluje školní řád a navrhuje jejich změny</li>
              <li>schvaluje pravidla pro hodnocení výsledků vzdělávání žáků</li>
              <li>podílí se na zpracování koncepčních záměrů rozvoje školy</li>
              <li>
                projednává návrh rozpočtu na další rok, vyjadřuje se k rozboru hospodaření a navrhuje opatření ke
                zlepšení hospodaření
              </li>
              <li>projednává inspekční zprávy České školní inspekce</li>
              <li>
                podává podněty a oznámení řediteli školy, zřizovateli, orgánům vykonávajícím státní správu ve školství a
                dalším orgánům státní správy
              </li>
            </ul>
            <span>
              Třetinu členů školské rady jmenuje zřizovatel, třetinu volí zákonní zástupci nezletilých žáků a třetinu
              volí pedagogičtí pracovníci školy. Členem školské rady nemůže být ředitel školy.
            </span>
            <div className="semi_table">
              <div className="semi_table__cell">
                <span>Zástupci školy:</span>
              </div>
              <div className="semi_table__cell">
                <span>Mgr. Jitka Domanská</span> <span>Barbora Zapletalová</span> <span>Mgr. Ivana Klobásková</span>
              </div>
              <hr className="semi_table__line" />
              <div className="semi_table__cell">
                <span>Zástupci rodičů:</span>
              </div>
              <div className="semi_table__cell">
                <span>Pavlína Cahová</span> <span>Michaela Frelichová</span> <span>Michaela Půčková</span>
              </div>
              <hr className="semi_table__line" />
              <div className="semi_table__cell">
                <span>Zástupci zřizovatele:</span>
              </div>
              <div className="semi_table__cell">
                <span>Mgr. Petra Horká</span> <span>Mgr. Jolana Mertová</span> <span>Hana Součková</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
