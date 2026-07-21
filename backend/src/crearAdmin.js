import bcrypt from "bcryptjs";
import pool from "./config/db.js";

const crearAdmin = async () => {
  try {
    const nombre = "Administrador";
    const email = "admin@matafuegosabc.com";
    const password = "Admin1234";

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO usuarios_admin
      (nombre, email, password, rol)
      VALUES (?, ?, ?, ?)`,
      [nombre, email, passwordHash, "admin"],
    );

    console.log("Administrador creado correctamente");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    process.exit();
  } catch (error) {
    console.error("Error al crear administrador:", error);
    process.exit(1);
  }
};

crearAdmin();
