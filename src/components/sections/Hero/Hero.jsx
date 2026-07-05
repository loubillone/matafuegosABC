import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaShieldAlt,
  FaBolt,
  FaCertificate,
  FaFireExtinguisher,
} from "react-icons/fa";
import { siteConfig } from "../../../data/siteConfig";
import { whatsappLink } from "../../../utils/whatsapp";
import "./Hero.css";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__glow" aria-hidden="true" />
      <Container>
        <Row className="align-items-center gy-5">
          <Col lg={6}>
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.span className="pill pill-safe" variants={item}>
                <FaShieldAlt /> Empresa certificada bajo norma IRAM
              </motion.span>

              <motion.h1 className="hero__title" variants={item}>
                Protegé lo que importa con{" "}
                <span className="hero__highlight">matafuegos certificados</span>
              </motion.h1>

              <motion.p className="hero__lead lead-text" variants={item}>
                Venta, recarga, mantenimiento y certificación de equipos contra
                incendios para hogares, comercios e industrias. Servicio rápido,
                a domicilio y con respaldo técnico en {siteConfig.coverage}.
              </motion.p>

              <motion.div className="hero__actions" variants={item}>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-fire"
                >
                  <FaWhatsapp /> Pedir presupuesto
                </a>
                <a href={siteConfig.phoneHref} className="btn btn-outline-ink">
                  <FaPhoneAlt /> {siteConfig.phone}
                </a>
              </motion.div>

              <motion.ul className="hero__trust" variants={item}>
                <li>
                  <FaBolt /> Respuesta en 24 h
                </li>
                <li>
                  <FaCertificate /> Certificación válida
                </li>
                <li>
                  <FaShieldAlt /> Garantía escrita
                </li>
              </motion.ul>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              className="hero__visual"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero__card hero__card--main">
                <div className="hero__extinguisher">
                  <FaFireExtinguisher />
                </div>
                <div className="hero__card-body">
                  <span className="pill pill-safe">Estado: vigente</span>
                  <h3>Matafuego ABC 5kg</h3>
                  <p>Próxima recarga: en 12 meses</p>
                </div>
              </div>

              <motion.div
                className="hero__card hero__badge hero__badge--top"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaCertificate />
                <div>
                  <strong>IRAM</strong>
                  <span>Certificado</span>
                </div>
              </motion.div>

              <motion.div
                className="hero__card hero__badge hero__badge--bottom"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaBolt />
                <div>
                  <strong>Recarga en el día</strong>
                  <span>Retiro a domicilio</span>
                </div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
