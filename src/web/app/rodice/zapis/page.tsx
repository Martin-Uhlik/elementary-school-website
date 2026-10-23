// Ported from html/rodice/zapis.html
export default function RodiceZapisPage() {
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Zápis žáků 1. třídy do školního roku 2023/2024</h1>
            <div className="documents">
              <a href="/dokument/202303_plakat.doc">Plakát - zápis žáku do 1. Třídy</a>{" "}
              <a href="/dokument/202303_DESATERO%20PRO%20RODIČE.doc">Desatero pro rodiče</a>{" "}
              <a href="/dokument/202303_ŽÁDOST%20O%20PŘIJETÍ%20DÍTĚTE%20K%20ZÁKLADNÍMU%20VZDĚLÁVÁNÍ.doc">
                Žádost o přijetí dítěte k základnímu vzdělávání
              </a>{" "}
              <a href="/dokument/202303_ZÁPISNÍ%20LIST%20PRO%20ŠKOLNÍ%20ROK.doc">Zápisní list pro školní rok</a>{" "}
              <a href="/dokument/202303_OZNÁMENÍ%20O%20MOŽNOSTI%20NAHLÉDNOUT%20DO%20SPISU.doc">
                Oznámení o možnosti nahlédnout do spisu
              </a>{" "}
              <a href="/dokument/202303_ŽÁDOST%20O%20ODKLAD%20POVINNÉ%20ŠKOLNÍ%20DOCHÁZKY.doc">
                Žádost o odklad povinné školní docházky
              </a>{" "}
              <a href="/dokument/202303_REGISTRAČNÍ%20ČÍSLO.doc">Registrační číslo</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
