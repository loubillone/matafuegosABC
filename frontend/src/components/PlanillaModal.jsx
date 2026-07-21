import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaClipboardList } from "react-icons/fa";
import Swal from "sweetalert2";
import "./PlanillaModal.css";

const emptyForm = {
  solicitud_id: null,
  fecha: "",
  hora: "",
  cliente: "",
  direccion: "",
  contacto: "",
  telefono: "",
  entregar: 0,
  retirar: 0,
  cobrar: false,
  personal: "",
  observaciones: "",
};

function PlanillaModal({ open, onClose, initialData, onSaved }) {
  const [formData, setFormData] = useState(emptyForm);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (open) {
      // Reset controlado al abrir: precarga los datos de la solicitud.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({ ...emptyForm, ...initialData });
    }
    // Solo re-sincroniza al abrir el modal para no pisar la edición del usuario.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setGuardando(true);

      const payload = {
        solicitud_id: formData.solicitud_id ?? null,
        fecha: formData.fecha,
        hora: formData.hora,
        cliente: formData.cliente,
        direccion: formData.direccion,
        contacto: formData.contacto,
        telefono: formData.telefono,
        entregar: formData.entregar === "" ? 0 : Number(formData.entregar),
        retirar: formData.retirar === "" ? 0 : Number(formData.retirar),
        cobrar: Boolean(formData.cobrar),
        personal: formData.personal,
        observaciones: formData.observaciones,
      };

      const response = await fetch("http://localhost:3000/api/planillas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 409) {
        setGuardando(false);
        Swal.fire({
          icon: "warning",
          title: "Horario ocupado",
          text: "Ya existe una tarea programada para esa fecha y hora. Elegí otro horario.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#ed1c24",
        });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Error al agregar a la planilla");
      }

      setGuardando(false);
      onClose();

      if (onSaved) onSaved(payload);

      Swal.fire({
        icon: "success",
        title: "Agregado a planilla",
        text: "El registro fue agregado correctamente a la planilla diaria.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#ed1c24",
      });
    } catch (error) {
      console.error(error);
      setGuardando(false);
      Swal.fire({
        icon: "error",
        title: "No se pudo agregar",
        text: "Ocurrió un error al agregar el registro a la planilla. Intentá nuevamente.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#ed1c24",
      });
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="planilla-modal__backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="planilla-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="planilla-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="planilla-modal__close"
              aria-label="Cerrar"
              onClick={onClose}
            >
              <FaTimes />
            </button>

            <div className="planilla-modal__header">
              <span className="eyebrow">
                <FaClipboardList /> Planilla diaria
              </span>
              <h2 id="planilla-modal-title" className="planilla-modal__title">
                {formData.solicitud_id
                  ? "Agregar solicitud a la planilla"
                  : "Agregar registro a la planilla"}
              </h2>
              <p className="planilla-modal__desc">
                Revisá y completá los datos del retiro antes de guardarlo en la
                planilla del día.
              </p>
            </div>

            <form className="planilla-form" onSubmit={handleSubmit} noValidate>
              <div className="planilla-field planilla-field--full">
                <label htmlFor="pl-cliente">Cliente</label>
                <input
                  id="pl-cliente"
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="planilla-field planilla-field--full">
                <label htmlFor="pl-direccion">Dirección</label>
                <input
                  id="pl-direccion"
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </div>

              <div className="planilla-field">
                <label htmlFor="pl-contacto">Contacto</label>
                <input
                  id="pl-contacto"
                  type="text"
                  name="contacto"
                  value={formData.contacto}
                  onChange={handleChange}
                />
              </div>

              <div className="planilla-field">
                <label htmlFor="pl-telefono">Teléfono</label>
                <input
                  id="pl-telefono"
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="planilla-field">
                <label htmlFor="pl-fecha">Fecha</label>
                <input
                  id="pl-fecha"
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="planilla-field">
                <label htmlFor="pl-hora">Hora</label>
                <input
                  id="pl-hora"
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                />
              </div>

              <div className="planilla-field">
                <label htmlFor="pl-entregar">Entregar</label>
                <input
                  id="pl-entregar"
                  type="number"
                  name="entregar"
                  min="0"
                  value={formData.entregar}
                  onChange={handleChange}
                />
              </div>

              <div className="planilla-field">
                <label htmlFor="pl-retirar">Retirar</label>
                <input
                  id="pl-retirar"
                  type="number"
                  name="retirar"
                  min="0"
                  value={formData.retirar}
                  onChange={handleChange}
                />
              </div>

              <div className="planilla-field">
                <label htmlFor="pl-personal">Personal</label>
                <input
                  id="pl-personal"
                  type="text"
                  name="personal"
                  value={formData.personal}
                  onChange={handleChange}
                />
              </div>

              <div className="planilla-field planilla-field--check">
                <label className="planilla-check">
                  <input
                    type="checkbox"
                    name="cobrar"
                    checked={Boolean(formData.cobrar)}
                    onChange={handleChange}
                  />
                  <span>Cobrar en esta visita</span>
                </label>
              </div>

              <div className="planilla-field planilla-field--full">
                <label htmlFor="pl-observaciones">Observaciones</label>
                <textarea
                  id="pl-observaciones"
                  name="observaciones"
                  rows="3"
                  value={formData.observaciones}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-fire planilla-form__submit"
                disabled={guardando}
              >
                {guardando ? "Guardando..." : "Guardar en planilla"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default PlanillaModal;
