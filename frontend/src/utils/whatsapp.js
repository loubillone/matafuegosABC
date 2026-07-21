import { siteConfig } from "../data/siteConfig";

const DEFAULT_MESSAGE =
  "¡Hola! Quiero hacer una consulta sobre matafuegos y equipos contra incendios.";

export function whatsappLink(message = DEFAULT_MESSAGE) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}

export function whatsappProductLink(productName) {
  return whatsappLink(`Hola, quisiera consultar por el producto ${productName}.`);
}
