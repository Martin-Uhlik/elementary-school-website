import { LuCreditCard, LuInbox, LuLandmark, LuMail, LuMapPin } from "react-icons/lu";

// Dark footer with the dashed wave from the zig-zag pages, the school name next to the logo and the details in columns
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wave" aria-hidden="true" />
      <div className="footer__columns">
        <div className="footer__brand">
          <img className="footer__logo" src="/data/images/logo.png" alt="" />
          <span>Základní škola a&nbsp;Mateřská škola, Moravský Písek, příspěvková organizace</span>
        </div>
        <div className="footer__column">
          <h2 className="footer__heading">Adresa</h2>
          <p className="footer__line">
            <LuMapPin className="footer__icon" aria-hidden="true" />
            <span>
              Velkomoravská 168
              <br />
              696 85 Moravský Písek
            </span>
          </p>
        </div>
        <div className="footer__column">
          <h2 className="footer__heading">Kontakt</h2>
          <p className="footer__line">
            <LuMail className="footer__icon" aria-hidden="true" />
            <a className="footer__link" href="mailto:zsmp@zsmp.cz">
              zsmp@zsmp.cz
            </a>
          </p>
          <p className="footer__line">
            <LuInbox className="footer__icon" aria-hidden="true" />
            <span>Datová schránka: prhy47n</span>
          </p>
        </div>
        <div className="footer__column">
          <h2 className="footer__heading">Údaje</h2>
          <p className="footer__line">
            <LuLandmark className="footer__icon" aria-hidden="true" />
            <span>IČO: 75021161</span>
          </p>
          <p className="footer__line">
            <LuCreditCard className="footer__icon" aria-hidden="true" />
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
