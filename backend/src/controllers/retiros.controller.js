import pool from "../config/db.js";

export const crearRetiro = async (req, res) => {
  try {
    const {
      empresa,
      encargado,
      direccion,
      localidad,
      telefono,
      cantidad,
      horario,
      observaciones,
    } = req.body;

    const [resultado] = await pool.query(
      `INSERT INTO solicitudes_retiro
      (empresa, encargado, direccion, localidad, telefono, cantidad, horario, observaciones)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        empresa,
        encargado,
        direccion,
        localidad,
        telefono,
        cantidad,
        horario,
        observaciones,
      ],
    );

    res.status(201).json({
      message: "Solicitud de retiro creada correctamente",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Error al crear solicitud:", error);

    res.status(500).json({
      message: "Error al crear la solicitud de retiro",
    });
  }
};
