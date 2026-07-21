import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaTruck, FaBars, FaTimes } from "react-icons/fa";
import { siteConfig, navLinks } from "../../../data/siteConfig";
import { useRetiro } from "../../../context/retiroContext";
import logo from "../../../assets/images/logo_abc.jpeg";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openRetiro } = useRetiro();

  const handleRetiroClick = () => {
    setOpen(false);
    openRetiro();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <Container className="nav__inner">
        <a href="/#inicio" className="nav__brand" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt={`${siteConfig.brand} - ${siteConfig.tagline}`}
            className="nav__logo"
            width="52"
            height="52"
          />
          <span className="nav__brand-text">
            {siteConfig.brand}
            <small>{siteConfig.tagline}</small>
          </span>
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="nav__link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="btn btn-fire nav__cta-mobile"
            onClick={handleRetiroClick}
          >
            <FaTruck /> Solicitar retiro
          </button>
        </nav>

        <button
          type="button"
          className="btn btn-fire nav__cta"
          onClick={handleRetiroClick}
        >
          <FaTruck /> Solicitar retiro
        </button>

        <button
          className="nav__toggle"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </Container>
    </header>
  );
}

export default Navbar;
