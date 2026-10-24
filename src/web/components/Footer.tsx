import { LuCreditCard, LuInbox, LuLandmark, LuMail, LuMapPin } from "react-icons/lu";

// Dark footer with the dashed wave from the zig-zag pages, the school name next to the logo and the details in columns
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wave" aria-hidden="true" />
      <div className="footer__columns">
        <div className="footer__brand">
          <img src="/data/images/logo.png" alt="" />
          <span>Základní škola a&nbsp;Mateřská škola, Moravský Písek, příspěvková organizace</span>
        </div>
        <div className="footer__column">
          <h2>Adresa</h2>
          <p>
            <LuMapPin aria-hidden="true" />
            <span>
              Velkomoravská 168
              <br />
              696 85 Moravský Písek
            </span>
          </p>
        </div>
        <div className="footer__column">
          <h2>Kontakt</h2>
          <p>
            <LuMail aria-hidden="true" />
            <a href="mailto:zsmp@zsmp.cz">zsmp@zsmp.cz</a>
          </p>
          <p>
            <LuInbox aria-hidden="true" />
            <span>Datová schránka: prhy47n</span>
          </p>
        </div>
        <div className="footer__column">
          <h2>Údaje</h2>
          <p>
            <LuLandmark aria-hidden="true" />
            <span>IČO: 75021161</span>
          </p>
          <p>
            <LuCreditCard aria-hidden="true" />
            <span>
              č. ú. 27-7180000287/0100
              <br />
              KB Veselí nad Moravou
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
