import { Router } from "express";
import { createSecureNote } from "../controllers/secureNotesController.js";
import validateToken from "../middlewares/validateToken.js";
import validateNewSecureNote from "../schemas/validateNewSecureNote.js";

const router = Router();

router.post("/secure-notes", validateToken, validateNewSecureNote, createSecureNote);

export default router;