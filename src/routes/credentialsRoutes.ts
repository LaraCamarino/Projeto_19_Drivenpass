import { Router } from "express";
import { createCredential, getAllCredentials, getCredentialById, deleteCredential } from "../controllers/credentialsController.js";
import validateToken from "../middlewares/validateToken.js";
import validateNewCredential from "../schemas/validateNewCredential.js";

const router = Router();

router.post("/credentials", validateToken, validateNewCredential, createCredential);
router.get("/credentials", validateToken, getAllCredentials);
router.get("/credentials/:id", validateToken, getCredentialById);
router.delete("/credentials/:id", validateToken, deleteCredential);

export default router;