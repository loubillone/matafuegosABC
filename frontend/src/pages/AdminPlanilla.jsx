import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaClipboardList, FaPlus } from "react-icons/fa";
import PlanillaModal from "../components/PlanillaModal";
import AdminNav from "../components/admin/AdminNav/AdminNav";
import { getAuthHeaders, handleUnauthorized } from "../utils/adminAuth";
import "./AdminRetiros.css";

const hoy = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
};

const AdminPlanilla = () => {
  const [fecha, setFecha] = useState(hoy());
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let cancelado = false;

    const cargar = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/planillas?fecha=${fecha}`,
          { headers: getAuthHeaders() }
        );

        if (handleUnauthorized(response)) return;

        if (!response.ok) {
          throw new Error("No se pudo obtener la planilla");
        }

        const data = await response.json();
        if (!cancelado) {
          setRegistros(data);
          setError("");
        }
      } catch (err) {
        console.error(err);
        if (!cancelado) setError("No se pudo cargar la planilla diaria.");
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargar();

    return () => {
      cancelado = true;
    };
  }, [fecha, recarga]);

  const cambiarFecha = (nuevaFecha) => {
    setCargando(true);
    setFecha(nuevaFecha);
  };

  const recargarPlanilla = () => setRecarga((valor) => valor + 1);

  const abrirManual = () => setModalOpen(true);

  return (
    <>
      <AdminNav />
      <section className="section admin">
      <Container>
        <header className="admin__header">
          <span className="eyebrow">
            <FaClipboardList /> Planilla diaria
          </span>
          <h1 className="admin__title">Planilla diaria</h1>
          {!cargando && !error && (
            <p className="admin__count">
              {registros.length}{" "}
              {registros.length === 1 ? "tarea cargada" : "tareas cargadas"}
            </p>
          )}
        </header>

        <div className="admin__toolbar">
          <label className="admin__filter">
            <span>Fecha</span>
            <input
              type="date"
              value={fecha}
              onChange={(e) => cambiarFecha(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="btn btn-fire admin__add"
            onClick={abrirManual}
          >
            <FaPlus /> Agregar manualmente
          </button>
        </div>

        {cargando ? (
          <p className="admin__state">Cargando planilla...</p>
        ) : error ? (
          <p className="admin__state admin__state--error">{error}</p>
        ) : registros.length === 0 ? (
          <p className="admin__state">No hay tareas cargadas para esta fecha.</p>
        ) : (
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Dirección</th>
                  <th>Contacto</th>
                  <th>Teléfono</th>
                  <th>Entregar</th>
                  <th>Retirar</th>
                  <th>Cobrar</th>
                  <th>Personal</th>
                  <th>Observaciones</th>
                </tr>
              </thead>

              <tbody>
                {registros.map((registro) => (
                  <tr key={registro.id}>
                    <td className="admin__strong">{registro.hora || "-"}</td>
                    <td className="admin__strong">{registro.cliente}</td>
                    <td>{registro.direccion || "-"}</td>
                    <td>{registro.contacto || "-"}</td>
                    <td>{registro.telefono || "-"}</td>
                    <td>{registro.entregar ?? 0}</td>
                    <td>{registro.retirar ?? 0}</td>
                    <td>
                      <span
                        className={`admin__cobrar admin__cobrar--${
                          registro.cobrar ? "si" : "no"
                        }`}
                      >
                        {registro.cobrar ? "Sí" : "No"}
                      </span>
                    </td>
                    <td>{registro.personal || "-"}</td>
                    <td className="admin__obs">{registro.observaciones || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>

      <PlanillaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={{ fecha }}
        onSaved={recargarPlanilla}
      />
      </section>
    </>
  );
};

export default AdminPlanilla;
