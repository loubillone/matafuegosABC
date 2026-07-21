import { Router } from "express";
import {
  crearRetiro,
  obtenerRetiros,
  actualizarEstadoRetiro,
} from "../controllers/retiros.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", crearRetiro);
router.get("/", verificarToken, obtenerRetiros);
router.patch("/:id/estado", verificarToken, actualizarEstadoRetiro);

export default router;
