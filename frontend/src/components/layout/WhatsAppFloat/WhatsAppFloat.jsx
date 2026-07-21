import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../../../utils/whatsapp";
import "./WhatsAppFloat.css";

function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Escribinos por WhatsApp"
    >
      <FaWhatsapp />
      <span className="wa-float__label">WhatsApp</span>
    </a>
  );
}

export default WhatsAppFloat;
