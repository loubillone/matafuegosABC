import { FaCheck } from "react-icons/fa";
import "./ServiceCard.css";

function ServiceCard({ icon: Icon, title, description, features = [] }) {
  return (
    <article className="service-card">
      <div className="service-card__icon">
        <Icon />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{description}</p>
      {features.length > 0 && (
        <ul className="service-card__features">
          {features.map((feature) => (
            <li key={feature}>
              <FaCheck className="service-card__check" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default ServiceCard;
