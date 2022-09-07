import { Router } from "express";
import { createCredential } from "../controllers/credentialsController.js";
import validateToken from "../middlewares/validateToken.js";
import validateNewCredential from "../schemas/validateNewCredential.js";

const router = Router();

router.post("/credentials", validateToken, validateNewCredential, createCredential);

export default router;