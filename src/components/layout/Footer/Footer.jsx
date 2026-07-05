import { Container, Row, Col } from "react-bootstrap";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { siteConfig, navLinks } from "../../../data/siteConfig";
import { whatsappLink } from "../../../utils/whatsapp";
import logo from "../../../assets/images/logo_abc.jpeg";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <a href="/#inicio" className="footer__brand">
              <span className="footer__logo-chip">
                <img
                  src={logo}
                  alt={`${siteConfig.brand} - ${siteConfig.tagline}`}
                  className="footer__logo"
                  width="72"
                  height="72"
                />
              </span>
              <span>{siteConfig.brand}</span>
            </a>
            <p className="footer__about">
              Venta, recarga, mantenimiento y certificación de matafuegos y
              equipos contra incendios. Servicio profesional con respaldo
              técnico en {siteConfig.coverage}.
            </p>
            <div className="footer__social">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </Col>

          <Col lg={{ span: 3, offset: 1 }} md={6}>
            <h4 className="footer__title">Navegación</h4>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <a href={link.to}>{link.label}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={4} md={12}>
            <h4 className="footer__title">Contacto</h4>
            <ul className="footer__list footer__list--contact">
              <li>
                <FaPhoneAlt />
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </li>
              <li>
                <FaEnvelope />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer__bottom">
          <span>
            © {year} {siteConfig.legalName}. Todos los derechos reservados.
          </span>
          <span>Hecho con seguridad en Argentina 🇦🇷</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
