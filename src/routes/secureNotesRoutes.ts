import { Router } from "express";
import { createSecureNote, getAllSecureNotes, getSecureNoteById, deleteSecureNote } from "../controllers/secureNotesController.js";
import validateToken from "../middlewares/validateToken.js";
import validateNewSecureNote from "../schemas/validateNewSecureNote.js";

const router = Router();

router.post("/secure-notes", validateToken, validateNewSecureNote, createSecureNote);
router.get("/secure-notes", validateToken, getAllSecureNotes);
router.get("/secure-notes/:id", validateToken, getSecureNoteById);
router.delete("/secure-notes/:id", validateToken, deleteSecureNote);

export default router;