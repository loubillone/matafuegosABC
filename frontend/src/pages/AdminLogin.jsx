import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "../config/api";
import logo from "../assets/images/logo_abc.jpeg";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [cargando, setCargando] = useState(false);
  const [verPassword, setVerPassword] = useState(false);

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
      setCargando(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUsuario", JSON.stringify(data.usuario));

      await Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: `Hola ${data.usuario.nombre}`,
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/admin/retiros");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "No se pudo iniciar sesión",
        text: "Revisá el email y la contraseña.",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__card">
          <img
            src={logo}
            alt="Matafuegos ABC"
            className="admin-login__logo"
            width="64"
            height="64"
          />

          <h1 className="admin-login__title">Panel administrativo</h1>
          <p className="admin-login__subtitle">
            Ingresá con tus credenciales para continuar
          </p>

          <form className="admin-login__form" onSubmit={handleSubmit}>
            <div className="admin-login__field">
              <label className="admin-login__label" htmlFor="email">
                Email
              </label>
              <div className="admin-login__input-wrap">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="admin-login__input"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="admin-login__field">
              <label className="admin-login__label" htmlFor="password">
                Contraseña
              </label>
              <div className="admin-login__input-wrap">
                <input
                  type={verPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="admin-login__input admin-login__input--password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="admin-login__toggle"
                  onClick={() => setVerPassword((v) => !v)}
                  aria-label={
                    verPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {verPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login__button"
              disabled={cargando}
            >
              {cargando ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
