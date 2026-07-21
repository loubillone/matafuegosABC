import {
  FaFireExtinguisher,
  FaRecycle,
  FaTools,
  FaCertificate,
} from "react-icons/fa";

export const services = [
  {
    id: "venta",
    icon: FaFireExtinguisher,
    title: "Venta de matafuegos",
    description:
      "Equipos nuevos ABC, CO₂ y para clases especiales, homologados y listos para instalar en tu hogar, comercio o industria.",
    features: ["Todos los tipos y capacidades", "Marcas certificadas", "Asesoramiento incluido"],
  },
  {
    id: "recarga",
    icon: FaRecycle,
    title: "Recarga y repuestos",
    description:
      "Recarga de matafuegos en el día con controles de presión, sellado y repuestos originales. Retiro y entrega a domicilio.",
    features: ["Recarga en el día", "Retiro sin cargo", "Repuestos originales"],
  },
  {
    id: "mantenimiento",
    icon: FaTools,
    title: "Mantenimiento técnico",
    description:
      "Inspección, prueba hidráulica y mantenimiento preventivo para que tus equipos estén siempre operativos y vigentes.",
    features: ["Prueba hidráulica", "Plan preventivo", "Informe técnico"],
  },
  {
    id: "certificacion",
    icon: FaCertificate,
    title: "Certificación IRAM",
    description:
      "Certificamos tus equipos e instalaciones bajo normativa vigente para habilitaciones, seguros e inspecciones.",
    features: ["Bajo norma IRAM", "Documentación válida", "Apto habilitación"],
  },
];
