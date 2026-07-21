import { Router } from "express";
import { crearRetiro } from "../controllers/retiros.controller.js";

const router = Router();

router.post("/", crearRetiro);

export default router;
