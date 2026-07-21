import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    const [usuarios] = await pool.query(
      "SELECT * FROM usuarios_admin WHERE email = ?",
      [email],
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const usuario = usuarios[0];

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    res.json({
      message: "Login correcto",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);

    res.status(500).json({
      message: "Error al iniciar sesión",
    });
  }
};
