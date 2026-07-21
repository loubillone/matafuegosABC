import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./ProductCategoryCard.css";

function ProductCategoryCard({ slug, nombre, descripcion, imagen, icon: Icon }) {
  return (
    <article className="category-card">
      <Link
        to={`/productos/${slug}`}
        className="category-card__media"
        aria-label={`Ver productos de ${nombre}`}
      >
        <img src={imagen} alt={nombre} loading="lazy" />
        {Icon && (
          <span className="category-card__icon">
            <Icon />
          </span>
        )}
      </Link>

      <div className="category-card__body">
        <h3 className="category-card__title">{nombre}</h3>
        <p className="category-card__desc">{descripcion}</p>
        <Link to={`/productos/${slug}`} className="btn btn-outline-ink category-card__cta">
          Ver productos <FaArrowRight />
        </Link>
      </div>
    </article>
  );
}

export default ProductCategoryCard;
