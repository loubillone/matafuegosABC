import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { FaSearch, FaClipboardList } from "react-icons/fa";
import Swal from "sweetalert2";
import "./AdminRetiros.css";

const ESTADOS = ["Pendiente", "En proceso", "Retirado", "Entregado"];

const estadoSlug = (estado) =>
  (estado || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2200,
  timerProgressBar: true,
});

const AdminRetiros = () => {
  const [retiros, setRetiros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroLocalidad, setFiltroLocalidad] = useState("Todas");

  useEffect(() => {
    const obtenerRetiros = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/retiros");

        if (!response.ok) {
          throw new Error("No se pudieron obtener las solicitudes");
        }

        const data = await response.json();
        setRetiros(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las solicitudes.");
      } finally {
        setCargando(false);
      }
    };

    obtenerRetiros();
  }, []);

  const localidades = useMemo(() => {
    const unicas = new Set(
      retiros
        .map((retiro) => (retiro.localidad || "").trim())
        .filter((localidad) => localidad !== "")
    );
    return Array.from(unicas).sort((a, b) => a.localeCompare(b, "es"));
  }, [retiros]);

  const retirosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return retiros.filter((retiro) => {
      const coincideTexto =
        texto === "" ||
        (retiro.empresa || "").toLowerCase().includes(texto) ||
        (retiro.encargado || "").toLowerCase().includes(texto);

      const coincideEstado =
        filtroEstado === "Todos" || retiro.estado === filtroEstado;

      const coincideLocalidad =
        filtroLocalidad === "Todas" || retiro.localidad === filtroLocalidad;

      return coincideTexto && coincideEstado && coincideLocalidad;
    });
  }, [retiros, busqueda, filtroEstado, filtroLocalidad]);

  const cambiarEstado = async (id, nuevoEstado) => {
    const retiroActual = retiros.find((retiro) => retiro.id === id);
    if (!retiroActual || retiroActual.estado === nuevoEstado) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/retiros/${id}/estado`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo actualizar el estado");
      }

      setRetiros((prev) =>
        prev.map((retiro) =>
          retiro.id === id ? { ...retiro, estado: nuevoEstado } : retiro
        )
      );

      Toast.fire({
        icon: "success",
        title: "Estado actualizado",
      });
    } catch (err) {
      console.error(err);
      // El <select> es controlado por el estado, por lo que al no
      // actualizarlo vuelve visualmente al valor anterior.
      Swal.fire({
        icon: "error",
        title: "No se pudo actualizar",
        text: "Ocurrió un error al actualizar el estado. Intentá nuevamente.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#ed1c24",
      });
    }
  };

  return (
    <section className="section admin">
      <Container>
        <header className="admin__header">
          <span className="eyebrow">
            <FaClipboardList /> Panel administrativo
          </span>
          <h1 className="admin__title">Solicitudes de retiro</h1>
          {!cargando && !error && (
            <p className="admin__count">
              {retirosFiltrados.length}{" "}
              {retirosFiltrados.length === 1
                ? "solicitud visible"
                : "solicitudes visibles"}
              {retirosFiltrados.length !== retiros.length &&
                ` de ${retiros.length} en total`}
            </p>
          )}
        </header>

        {cargando ? (
          <p className="admin__state">Cargando solicitudes...</p>
        ) : error ? (
          <p className="admin__state admin__state--error">{error}</p>
        ) : (
          <>
            <div className="admin__filters">
              <div className="admin__search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Buscar por empresa o encargado"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              <label className="admin__filter">
                <span>Estado</span>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <option value="Todos">Todos</option>
                  {ESTADOS.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </label>

              <label className="admin__filter">
                <span>Localidad</span>
                <select
                  value={filtroLocalidad}
                  onChange={(e) => setFiltroLocalidad(e.target.value)}
                >
                  <option value="Todas">Todas</option>
                  {localidades.map((localidad) => (
                    <option key={localidad} value={localidad}>
                      {localidad}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {retirosFiltrados.length === 0 ? (
              <p className="admin__state">
                {retiros.length === 0
                  ? "No hay solicitudes registradas."
                  : "No hay solicitudes que coincidan con los filtros."}
              </p>
            ) : (
              <div className="admin__table-wrap">
                <table className="admin__table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Empresa</th>
                      <th>Encargado</th>
                      <th>Teléfono</th>
                      <th>Cantidad</th>
                      <th>Localidad</th>
                      <th>Estado</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>

                  <tbody>
                    {retirosFiltrados.map((retiro) => (
                      <tr key={retiro.id}>
                        <td className="admin__id">#{retiro.id}</td>
                        <td className="admin__strong">{retiro.empresa}</td>
                        <td>{retiro.encargado}</td>
                        <td>{retiro.telefono}</td>
                        <td>{retiro.cantidad ?? "-"}</td>
                        <td>{retiro.localidad || "-"}</td>
                        <td>
                          <select
                            className={`admin__estado admin__estado--${estadoSlug(
                              retiro.estado
                            )}`}
                            value={retiro.estado || "Pendiente"}
                            onChange={(e) =>
                              cambiarEstado(retiro.id, e.target.value)
                            }
                          >
                            {ESTADOS.map((estado) => (
                              <option key={estado} value={estado}>
                                {estado}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="admin__date">
                          {retiro.fecha_solicitud
                            ? new Date(retiro.fecha_solicitud).toLocaleString(
                                "es-AR"
                              )
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default AdminRetiros;
