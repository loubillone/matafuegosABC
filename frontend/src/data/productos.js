import {
  FaFireExtinguisher,
  FaWater,
  FaFaucet,
  FaBell,
  FaMapSigns,
} from "react-icons/fa";

import imgMatafuegoAbc5kg from "../assets/images/productos/matafuego-abc-5kg.webp";
import imgMatafuegoAbc10kg from "../assets/images/productos/matafuego-abc-10kg.webp";
import imgMatafuegoCo2 from "../assets/images/productos/matafuego-co2.webp";
import imgManguera175 from "../assets/images/productos/manguera-175.webp";
import imgManguera25 from "../assets/images/productos/manguera-25.webp";
import imgLanzaBronce from "../assets/images/productos/lanza-bronce.webp";
import imgValvulaEsclusa from "../assets/images/productos/valvula-esclusa.webp";
import imgSprinkler from "../assets/images/productos/sprinkler.webp";
import imgDetectorHumo from "../assets/images/productos/detector-humo.webp";
import imgCartelMatafuego from "../assets/images/productos/cartel-matafuego.webp";
import imgCartelSalida from "../assets/images/productos/cartel-salida.webp";

/**
 * Categorías de productos.
 * Para agregar una categoría nueva, sumá un objeto con un `slug` único.
 * La imagen es un placeholder: reemplazá `imagen` por la imagen real
 * (por ejemplo importándola desde src/assets/images/...).
 */
export const categorias = [
  {
    id: "matafuegos-extintores",
    slug: "matafuegos-extintores",
    nombre: "Matafuegos y Extintores",
    descripcion:
      "Equipos para prevención y combate de incendios, disponibles en diferentes capacidades y agentes extintores.",
    icon: FaFireExtinguisher,
    imagen:
      "https://placehold.co/800x600/1c2128/ffffff?text=Matafuegos+y+Extintores",
  },
  {
    id: "mangueras",
    slug: "mangueras",
    nombre: "Mangueras Contra Incendio",
    descripcion:
      "Mangueras y equipamiento para instalaciones fijas y sistemas profesionales de protección contra incendios.",
    icon: FaWater,
    imagen:
      "https://placehold.co/800x600/1c2128/ffffff?text=Mangueras+Contra+Incendio",
  },
  {
    id: "bronceria-accesorios",
    slug: "bronceria-accesorios",
    nombre: "Broncería y Accesorios",
    descripcion:
      "Lanzas, válvulas, conexiones, adaptadores y accesorios para sistemas contra incendios.",
    icon: FaFaucet,
    imagen:
      "https://placehold.co/800x600/1c2128/ffffff?text=Broncer%C3%ADa+y+Accesorios",
  },
  {
    id: "rociadores-detectores",
    slug: "rociadores-detectores",
    nombre: "Rociadores y Detectores",
    descripcion:
      "Equipamiento para detección temprana y sistemas automáticos de prevención y extinción de incendios.",
    icon: FaBell,
    imagen:
      "https://placehold.co/800x600/1c2128/ffffff?text=Rociadores+y+Detectores",
  },
  {
    id: "carteleria",
    slug: "carteleria",
    nombre: "Cartelería de Seguridad",
    descripcion:
      "Señalización reglamentaria para identificación de matafuegos, salidas, evacuación y elementos de seguridad.",
    icon: FaMapSigns,
    imagen:
      "https://placehold.co/800x600/1c2128/ffffff?text=Carteler%C3%ADa+de+Seguridad",
  },
];

/**
 * Productos de ejemplo. Reemplazá nombre, descripcion, caracteristicas e imagen
 * por los productos reales. El campo `categoria` debe coincidir con el `slug`
 * de una categoría de arriba para que el producto aparezca en la página correcta.
 */
export const productos = [
  // Matafuegos y Extintores
  {
    id: 1,
    nombre: "Matafuego ABC 5 kg",
    categoria: "matafuegos-extintores",
    descripcion:
      "Extintor de polvo químico seco ABC, ideal para hogares, comercios y vehículos.",
    caracteristicas: ["Agente ABC (polvo)", "Capacidad 5 kg", "Apto clases A, B y C"],
    imagen: imgMatafuegoAbc5kg,
  },
  {
    id: 2,
    nombre: "Matafuego ABC 10 kg",
    categoria: "matafuegos-extintores",
    descripcion:
      "Mayor capacidad para industrias, depósitos y espacios de gran superficie.",
    caracteristicas: ["Agente ABC (polvo)", "Capacidad 10 kg", "Uso industrial"],
    imagen: imgMatafuegoAbc10kg,
  },
  {
    id: 3,
    nombre: "Matafuego CO₂ 3,5 kg",
    categoria: "matafuegos-extintores",
    descripcion:
      "Dióxido de carbono para fuegos eléctricos y equipos electrónicos, sin dejar residuos.",
    caracteristicas: ["Agente CO₂", "Capacidad 3,5 kg", "Apto clases B y C"],
    imagen: imgMatafuegoCo2,
  },

  // Mangueras Contra Incendio
  {
    id: 4,
    nombre: "Manguera contra incendio 1¾\"",
    categoria: "mangueras",
    descripcion:
      "Manguera de doble recubrimiento para instalaciones fijas y equipos de bomberos.",
    caracteristicas: ['Diámetro 1¾"', "Alta resistencia", "Uso profesional"],
    imagen: imgManguera175,
  },
  {
    id: 5,
    nombre: "Manguera contra incendio 2½\"",
    categoria: "mangueras",
    descripcion:
      "Mayor caudal para sistemas de gran demanda e instalaciones industriales.",
    caracteristicas: ['Diámetro 2½"', "Alto caudal", "Instalaciones fijas"],
    imagen: imgManguera25,
  },

  // Broncería y Accesorios
  {
    id: 6,
    nombre: "Lanza reguladora de bronce",
    categoria: "bronceria-accesorios",
    descripcion:
      "Lanza de chorro regulable en bronce, resistente y de larga durabilidad.",
    caracteristicas: ["Material bronce", "Chorro regulable", "Alta durabilidad"],
    imagen: imgLanzaBronce,
  },
  {
    id: 7,
    nombre: "Válvula esclusa de bronce",
    categoria: "bronceria-accesorios",
    descripcion:
      "Válvula para control de paso de agua en redes contra incendio.",
    caracteristicas: ["Material bronce", "Cierre hermético", "Uso en red hídrica"],
    imagen: imgValvulaEsclusa,
  },

  // Rociadores y Detectores
  {
    id: 8,
    nombre: "Rociador sprinkler",
    categoria: "rociadores-detectores",
    descripcion:
      "Rociador automático de respuesta rápida para sistemas de extinción por agua.",
    caracteristicas: ["Activación por temperatura", "Respuesta rápida", "Cobertura amplia"],
    imagen: imgSprinkler,
  },
  {
    id: 9,
    nombre: "Detector de humo",
    categoria: "rociadores-detectores",
    descripcion:
      "Detector óptico para alerta temprana de humo en ambientes cerrados.",
    caracteristicas: ["Sensor óptico", "Alerta temprana", "Fácil instalación"],
    imagen: imgDetectorHumo,
  },

  // Cartelería de Seguridad
  {
    id: 10,
    nombre: "Cartel identificación de matafuego",
    categoria: "carteleria",
    descripcion:
      "Señalización reglamentaria para indicar la ubicación del matafuego.",
    caracteristicas: ["Material fotoluminiscente", "Medidas reglamentarias", "Normativa vigente"],
    imagen: imgCartelMatafuego,
  },
  {
    id: 11,
    nombre: "Cartel de salida de emergencia",
    categoria: "carteleria",
    descripcion:
      "Señal de evacuación y salida de emergencia de alta visibilidad.",
    caracteristicas: ["Alta visibilidad", "Fotoluminiscente", "Apto habilitación"],
    imagen: imgCartelSalida,
  },
];

export function getCategoria(slug) {
  return categorias.find((categoria) => categoria.slug === slug);
}

export function getProductosPorCategoria(slug) {
  return productos.filter((producto) => producto.categoria === slug);
}
