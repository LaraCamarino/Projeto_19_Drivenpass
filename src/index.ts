import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";

import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import credentialsRoutes from "./routes/credentialsRoutes.js";
import secureNotesRoutes from "./routes/secureNotesRoutes.js";
import cardsRoutes from "./routes/cardsRoutes.js";
import networksRoutes from "./routes/networksRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes, credentialsRoutes, secureNotesRoutes, cardsRoutes, networksRoutes, errorHandler);

const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log("Server running on port " + process.env.PORT));