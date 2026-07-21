import { FaCheck, FaWhatsapp } from "react-icons/fa";
import { whatsappProductLink } from "../../../utils/whatsapp";
import "./ProductCard.css";

function ProductCard({ nombre, descripcion, caracteristicas = [], imagen, categoria }) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={imagen} alt={nombre} loading="lazy" />
        {categoria && <span className="product-card__tag">{categoria}</span>}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{nombre}</h3>
        <p className="product-card__desc">{descripcion}</p>

        {caracteristicas.length > 0 && (
          <ul className="product-card__features">
            {caracteristicas.map((feature) => (
              <li key={feature}>
                <FaCheck className="product-card__check" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={whatsappProductLink(nombre)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-fire product-card__cta"
        >
          <FaWhatsapp /> Consultar
        </a>
      </div>
    </article>
  );
}

export default ProductCard;
