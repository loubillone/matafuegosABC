import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import ProductCard from "../components/ui/ProductCard/ProductCard";
import Reveal from "../components/ui/Reveal/Reveal";
import { getCategoria, getProductosPorCategoria } from "../data/productos";
import { whatsappLink } from "../utils/whatsapp";
import "./ProductsPage.css";

function ProductCategory() {
  const { slug } = useParams();
  const categoria = getCategoria(slug);
  const productos = getProductosPorCategoria(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!categoria) {
    return (
      <section className="section products-page">
        <Container className="products-page__empty">
          <h1 className="products-page__empty-title">Categoría no encontrada</h1>
          <p className="lead-text">
            La categoría que buscás no existe o fue movida.
          </p>
          <Link to="/productos" className="btn btn-fire">
            <FaArrowLeft /> Volver a productos
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="section products-page">
      <Container>
        <Reveal>
          <Link to="/productos" className="products-page__back">
            <FaArrowLeft /> Volver a productos
          </Link>
        </Reveal>

        <div className="products-page__header">
          <Reveal>
            <span className="eyebrow">
              {categoria.icon && <categoria.icon />} Categoría
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="products-page__title">{categoria.nombre}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="products-page__subtitle lead-text">
              {categoria.descripcion}
            </p>
          </Reveal>
        </div>

        {productos.length > 0 ? (
          <Row className="g-4">
            {productos.map((producto, index) => (
              <Col sm={6} lg={4} key={producto.id}>
                <Reveal delay={index * 0.06} className="h-100">
                  <ProductCard
                    nombre={producto.nombre}
                    descripcion={producto.descripcion}
                    caracteristicas={producto.caracteristicas}
                    imagen={producto.imagen}
                    categoria={categoria.nombre}
                  />
                </Reveal>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="products-page__empty">
            <p className="lead-text">
              Pronto vas a encontrar productos en esta categoría.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-fire"
            >
              <FaWhatsapp /> Consultanos por WhatsApp
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

export default ProductCategory;
