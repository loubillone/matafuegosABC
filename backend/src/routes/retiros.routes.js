import { Router } from "express";
import {
  crearRetiro,
  obtenerRetiros,
} from "../controllers/retiros.controller.js";

const router = Router();

router.post("/", crearRetiro);
router.get("/", obtenerRetiros);

export default router;
