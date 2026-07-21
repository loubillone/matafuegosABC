import { Router } from "express";
import {
  crearItemPlanilla,
  obtenerPlanillaPorFecha,
} from "../controllers/planillas.controller.js";

const router = Router();

router.post("/", crearItemPlanilla);
router.get("/", obtenerPlanillaPorFecha);

export default router;
