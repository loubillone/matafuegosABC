import { Container, Row, Col } from "react-bootstrap";
import SectionTitle from "../components/ui/SectionTitle/SectionTitle";
import ProductCategoryCard from "../components/ui/ProductCategoryCard/ProductCategoryCard";
import Reveal from "../components/ui/Reveal/Reveal";
import { categorias } from "../data/productos";
import "./ProductsPage.css";

function Products() {
  return (
    <section className="section products-page" id="productos">
      <Container>
        <SectionTitle
          eyebrow="Nuestros productos"
          title="Equipamiento profesional contra incendios"
          subtitle="Explorá nuestras categorías de productos. Elegí una para ver el detalle y consultá al instante por WhatsApp."
        />

        <Row className="g-4">
          {categorias.map((categoria, index) => (
            <Col md={6} xl={4} key={categoria.id}>
              <Reveal delay={index * 0.08} className="h-100">
                <ProductCategoryCard
                  slug={categoria.slug}
                  nombre={categoria.nombre}
                  descripcion={categoria.descripcion}
                  imagen={categoria.imagen}
                  icon={categoria.icon}
                />
              </Reveal>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Products;
