import { Router } from "express";
import {
  crearRetiro,
  obtenerRetiros,
  actualizarEstadoRetiro,
} from "../controllers/retiros.controller.js";

const router = Router();

router.post("/", crearRetiro);
router.get("/", obtenerRetiros);
router.patch("/:id/estado", actualizarEstadoRetiro);

export default router;
