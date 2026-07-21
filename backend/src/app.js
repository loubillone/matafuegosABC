import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import retirosRoutes from "./routes/retiros.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/retiros", retirosRoutes);
app.get("/", (req, res) => {
  res.send("API Matafuegos ABC funcionando");
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");

    res.json({
      message: "Conexión con MySQL correcta",
      resultado: rows[0].resultado,
    });
  } catch (error) {
    console.error("Error de conexión:", error);

    res.status(500).json({
      message: "Error al conectar con MySQL",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
