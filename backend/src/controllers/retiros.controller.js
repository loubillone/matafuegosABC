import pool from "../config/db.js";

export const ESTADOS_PERMITIDOS = [
  "Pendiente",
  "En proceso",
  "Retirado",
  "Entregado",
];

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

export const obtenerRetiros = async (req, res) => {
  try {
    const [retiros] = await pool.query(
      `SELECT * FROM solicitudes_retiro
       ORDER BY fecha_solicitud DESC`,
    );

    res.json(retiros);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);

    res.status(500).json({
      message: "Error al obtener las solicitudes de retiro",
    });
  }
};

export const actualizarEstadoRetiro = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!ESTADOS_PERMITIDOS.includes(estado)) {
      return res.status(400).json({
        message: "Estado no válido",
        estadosPermitidos: ESTADOS_PERMITIDOS,
      });
    }

    const [resultado] = await pool.query(
      `UPDATE solicitudes_retiro SET estado = ? WHERE id = ?`,
      [estado, id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        message: "Solicitud de retiro no encontrada",
      });
    }

    res.json({
      message: "Estado actualizado correctamente",
      id: Number(id),
      estado,
    });
  } catch (error) {
    console.error("Error al actualizar estado:", error);

    res.status(500).json({
      message: "Error al actualizar el estado de la solicitud",
    });
  }
};
