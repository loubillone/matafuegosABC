import Reveal from "../Reveal/Reveal";
import "./SectionTitle.css";

function SectionTitle({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="section-title__heading">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="section-title__subtitle lead-text">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export default SectionTitle;
