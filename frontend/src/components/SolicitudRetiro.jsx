import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaTruck, FaShieldAlt } from "react-icons/fa";
import Reveal from "./ui/Reveal/Reveal";
import { useRetiro } from "../context/retiroContext";
import "./SolicitudRetiro.css";

function SolicitudRetiro() {
  const { openRetiro } = useRetiro();

  return (
    <section className="section retiro" id="retiro">
      <Container>
        <Reveal>
          <div className="retiro-cta">
            <div className="retiro-cta__glow" aria-hidden="true" />

            <div className="retiro-cta__content">
              <span className="retiro-cta__eyebrow">
                <FaShieldAlt /> Servicio a domicilio
              </span>
              <h2 className="retiro-cta__title">
                ¿Necesitás recarga o mantenimiento?
              </h2>
              <p className="retiro-cta__text">
                Coordinamos el retiro de tus matafuegos en comercios, edificios,
                empresas e instituciones.
              </p>
            </div>

            <motion.button
              type="button"
              className="btn btn-fire retiro-cta__btn"
              onClick={openRetiro}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <FaTruck /> Solicitar retiro
            </motion.button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default SolicitudRetiro;
