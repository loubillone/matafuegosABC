import { Container, Row, Col } from "react-bootstrap";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import ServiceCard from "../../ui/ServiceCard/ServiceCard";
import Reveal from "../../ui/Reveal/Reveal";
import { services } from "../../../data/services";
import "./Services.css";

function Services() {
  return (
    <section className="section section-soft services" id="servicios">
      <Container>
        <SectionTitle
          eyebrow="Nuestros servicios"
          title="Todo lo que tus equipos contra incendios necesitan"
          subtitle="Un solo proveedor para vender, recargar, mantener y certificar. Servicio integral con respaldo técnico y documentación en regla."
        />

        <Row className="g-4">
          {services.map((service, index) => (
            <Col md={6} xl={3} key={service.id}>
              <Reveal delay={index * 0.08} className="h-100">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                />
              </Reveal>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Services;
