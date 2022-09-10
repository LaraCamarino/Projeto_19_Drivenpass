import { Router } from "express";
import { createNetwork, getAllNetworks, getNetworkById, deleteNetwork } from "../controllers/networksController.js";
import validateToken from "../middlewares/validateToken.js";
import validateNewNetwork from "../schemas/validateNewNetwork.js";

const router = Router();

router.post("/networks", validateToken, validateNewNetwork, createNetwork);
router.get("/networks", validateToken, getAllNetworks);
router.get("/networks/:id", validateToken, getNetworkById);
router.delete("/networks/:id", validateToken, deleteNetwork);

export default router;