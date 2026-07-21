import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaTruck } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "../config/api";
import "./SolicitudRetiro.css";

const initialForm = {
  empresa: "",
  encargado: "",
  direccion: "",
  localidad: "",
  telefono: "",
  cantidad: "",
  horario: "",
  observaciones: "",
};

function SolicitudRetiroModal({ open, onClose }) {
  const [formData, setFormData] = useState(initialForm);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setEnviando(true);

      const response = await fetch(`${API_URL}/api/retiros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cantidad: formData.cantidad ? Number(formData.cantidad) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar la solicitud");
      }

      setEnviando(false);

      await Swal.fire({
        icon: "success",
        title: "Solicitud enviada",
        text: "Recibimos tu solicitud de retiro correctamente. Nos comunicaremos para coordinar el servicio.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#ed1c24",
      });

      setFormData(initialForm);
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "No pudimos enviar la solicitud",
        text: "Intentá nuevamente en unos minutos.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#ed1c24",
      });
    } finally {
      setEnviando(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="retiro-modal__backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="retiro-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="retiro-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="retiro-modal__close"
              aria-label="Cerrar"
              onClick={onClose}
            >
              <FaTimes />
            </button>

            <div className="retiro-modal__header">
              <span className="eyebrow">
                <FaTruck /> Retiro a domicilio
              </span>
              <h2 id="retiro-modal-title" className="retiro-modal__title">
                Solicitá el retiro de tus matafuegos
              </h2>
              <p className="retiro-modal__desc">
                Completá tus datos y coordinamos el retiro para recarga, control
                o mantenimiento.
              </p>
            </div>

            <form className="retiro-form" onSubmit={handleSubmit} noValidate>
              <div className="retiro-field">
                <label htmlFor="empresa">Empresa / Comercio</label>
                <input
                  id="empresa"
                  type="text"
                  name="empresa"
                  placeholder="Nombre del comercio / empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="retiro-field">
                <label htmlFor="encargado">Persona de contacto</label>
                <input
                  id="encargado"
                  type="text"
                  name="encargado"
                  placeholder="Nombre y apellido"
                  value={formData.encargado}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="retiro-field">
                <label htmlFor="direccion">Dirección</label>
                <input
                  id="direccion"
                  type="text"
                  name="direccion"
                  placeholder="Calle y número"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="retiro-field">
                <label htmlFor="localidad">Localidad</label>
                <input
                  id="localidad"
                  type="text"
                  name="localidad"
                  placeholder="Localidad o barrio"
                  value={formData.localidad}
                  onChange={handleChange}
                />
              </div>

              <div className="retiro-field">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono de contacto"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="retiro-field">
                <label htmlFor="cantidad">
                  Cantidad aproximada de matafuegos
                </label>
                <input
                  id="cantidad"
                  type="number"
                  name="cantidad"
                  placeholder="Ej: 5"
                  min="1"
                  value={formData.cantidad}
                  onChange={handleChange}
                />
              </div>

              <div className="retiro-field retiro-field--full">
                <label htmlFor="horario">Horario disponible para retiro</label>
                <input
                  id="horario"
                  type="text"
                  name="horario"
                  placeholder="Ej: Lunes a viernes de 9 a 13 hs"
                  value={formData.horario}
                  onChange={handleChange}
                />
              </div>

              <div className="retiro-field retiro-field--full">
                <label htmlFor="observaciones">Observaciones</label>
                <textarea
                  id="observaciones"
                  name="observaciones"
                  rows="3"
                  placeholder="Detalles adicionales que quieras aclarar"
                  value={formData.observaciones}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-fire retiro-form__submit"
                disabled={enviando}
              >
                {enviando ? "Enviando..." : "Solicitar retiro"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default SolicitudRetiroModal;
