import { Router } from "express";
import { createCard, getAllCards, getCardById, deleteCard } from "../controllers/cardsController.js";
import validateToken from "../middlewares/validateToken.js";
import validateNewCard from "../schemas/validateNewCard.js";

const router = Router();

router.post("/cards", validateToken, validateNewCard, createCard);
router.get("/cards", validateToken, getAllCards);
router.get("/cards/:id", validateToken, getCardById);
router.delete("/cards/:id", validateToken, deleteCard);

export default router;