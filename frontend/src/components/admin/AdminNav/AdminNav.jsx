import { NavLink, useNavigate } from "react-router-dom";
import { FaClipboardList, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import logo from "../../../assets/images/logo_abc.jpeg";
import "./AdminNav.css";

const adminLinks = [
  { to: "/admin/retiros", label: "Solicitudes" },
  { to: "/admin/planilla", label: "Planilla diaria" },
];

function getUsuario() {
  try {
    const raw = localStorage.getItem("adminUsuario");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function AdminNav() {
  const navigate = useNavigate();
  const usuario = getUsuario();

  const cerrarSesion = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsuario");
    navigate("/admin/login");
  };

  return (
    <header className="admin-nav">
      <div className="admin-nav__inner">
        <div className="admin-nav__brand">
          <img
            src={logo}
            alt="Matafuegos ABC"
            className="admin-nav__logo"
            width="40"
            height="40"
          />
          <span className="admin-nav__title">
            <FaClipboardList /> Panel administrativo
          </span>
        </div>

        <nav className="admin-nav__links">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `admin-nav__link ${isActive ? "is-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-nav__actions">
          <span className="admin-nav__user">
            <FaUserShield />
            {usuario?.nombre || "Administrador"}
          </span>
          <button
            type="button"
            className="admin-nav__logout"
            onClick={cerrarSesion}
          >
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminNav;
