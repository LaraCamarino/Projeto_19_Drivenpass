import { cards as ICards } from "@prisma/client";

export type TypeNewCard = Omit<ICards, "id">;