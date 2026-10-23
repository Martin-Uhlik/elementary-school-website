// Ported from html/organizace/eduroam.html
export default function OrganizaceEduroamPage() {
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Eduroam</h1>
            <div className="article__body">
              <h2>Naše instituce/škola je připojena k eduroamu</h2>
              <p>
                Eduroam je mezinárodní projekt zabývající se podporou mobility a roamingu v sítích národního výzkumu a
                vzdělávání (NREN). V České republice je tento projekt zastřešován sdružením CESNET. Naše škola/instituce
                se do projektu zapojila v polovině roku 2019. Byl tak učiněn další krok ke zvýšení kvality zajištění
                studia a prestiže instituce.
              </p>
            </div>

            <div className="article__body">
              <h2>Jeden účet. Kdekoliv.</h2>
              <p>
                Registrovaný účastník může používat tuto bezdrátovou síť (kdekoliv je dostupná) pomocí jednoho
                uživatelského účtu.
              </p>
              <p>
                Použití roamingu je jednoduché, řádně nastavené zařízení účastníka se připojuje automaticky, jakmile je
                síť eduroam k dispozici. Podobně jako funguje připojení k zahraničním sítím mobilních operátorů v rámci
                roamingu. Odtud také akronym: education roaming.
              </p>
              <p>Služba je pro všechny účastníky zdarma.</p>
            </div>

            <div className="article__body">
              <h2>Aktivace eduroam účtu</h2>
              <p>
                V eduroamu se používá uživatelské jméno sestávající ze dvou částí - samotného uživatelského jména a
                realmu. Za uživatelské jméno, na něž jste zvyklí z ostatních systémů školy, budete v rámci roamingu
                přidávat znak @ a realm zsmp.cz. Například tedy: novak@zsmp.cz.
              </p>
            </div>

            <div className="article__body">
              <h2>Nastavení uživatelských zařízení pro připojení k eduroamu</h2>
              <div className="settings">
                <div className="settings__line">
                  <b>název sítě (SSID):&nbsp;</b> <span>eduroam</span>
                </div>
                <div className="settings__line">
                  <b>protokol připojení:&nbsp;</b> <span>802.1x</span>
                </div>
                <div className="settings__line">
                  <b>zabezpečení a šifrování:&nbsp;</b> <span>WPA2/AES</span>
                </div>
                <div className="settings__line">
                  <b>ověřování:&nbsp;</b> <span>PEAP</span>
                </div>
                <div className="settings__line">
                  <b>vnitřní autentizační protokol:&nbsp;</b> <span>MS-CHAPv2</span>
                </div>
                <div className="settings__line">
                  <b>jméno RADIUS serveru:&nbsp;</b> <span>radius.zsmp.cz</span>
                </div>
                <div className="settings__line">
                  <b>certifikační autorita:&nbsp;</b> <span>eduroam CA</span>
                </div>
                <div className="settings__line">
                  <a href="https://www.eduroam.cz/cs/spravce/pripojovani/eduroamca" target="_blank">
                    odkaz ke stažení certifikátu CA: eduroamca.pem
                  </a>
                </div>
                <div className="settings__line">
                  <span>IP adresa je přidělována automaticky prostřednictvím protokolu DHCP</span>
                </div>
              </div>
            </div>

            <div className="article__body">
              <h2>Pokryté prostory</h2>
              <p>
                Eduroam je vysílán ve většině prostorách školy. Z části je pak pokrytý i prostor v těsném okolí školy.
              </p>
            </div>

            <div className="article__body">
              <h2>Filtrování provozu</h2>
              <p>
                Do provozu návštěvníků není nijak zasahováno s výjimkou filtrování odchozího SMTP provozu (TCP/25). Pro
                odesílání pošty používejte služby SMTPS (TCP/465) anebo Submision (TCP/587).
              </p>
            </div>

            <div className="article__body">
              <h2>Podpora</h2>
              <p>
                Uživatelé naší školy se mohou obracet na email <a href="mailto:bukovjan@zsmp.cz">bukovjan@zsmp.cz</a> a
                nebo telefon +420 518 698 577.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
