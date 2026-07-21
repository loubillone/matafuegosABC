import { Router } from "express";
import {
  crearItemPlanilla,
  obtenerPlanillaPorFecha,
} from "../controllers/planillas.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, crearItemPlanilla);
router.get("/", verificarToken, obtenerPlanillaPorFecha);

export default router;
