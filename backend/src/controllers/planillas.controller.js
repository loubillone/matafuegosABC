import pool from "../config/db.js";

export const crearItemPlanilla = async (req, res) => {
  try {
    const {
      solicitud_id,
      fecha,
      hora,
      cliente,
      direccion,
      contacto,
      telefono,
      entregar,
      retirar,
      cobrar,
      personal,
      observaciones,
    } = req.body;

    const [resultado] = await pool.query(
      `INSERT INTO planilla_diaria
      (
        solicitud_id,
        fecha,
        hora,
        cliente,
        direccion,
        contacto,
        telefono,
        entregar,
        retirar,
        cobrar,
        personal,
        observaciones
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        solicitud_id || null,
        fecha,
        hora || "",
        cliente,
        direccion || "",
        contacto || "",
        telefono || "",
        entregar || 0,
        retirar || 0,
        cobrar || false,
        personal || "",
        observaciones || "",
      ],
    );

    res.status(201).json({
      message: "Registro agregado a la planilla correctamente",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Error al crear registro de planilla:", error);

    res.status(500).json({
      message: "Error al agregar el registro a la planilla",
    });
  }
};

export const obtenerPlanillaPorFecha = async (req, res) => {
  try {
    const { fecha } = req.query;

    let query = `
      SELECT *
      FROM planilla_diaria
    `;

    const params = [];

    if (fecha) {
      query += ` WHERE fecha = ?`;
      params.push(fecha);
    }

    query += ` ORDER BY hora ASC, id ASC`;

    const [registros] = await pool.query(query, params);

    res.json(registros);
  } catch (error) {
    console.error("Error al obtener planilla:", error);

    res.status(500).json({
      message: "Error al obtener la planilla diaria",
    });
  }
};
