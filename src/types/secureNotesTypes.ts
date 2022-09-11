import { secureNotes as ISecureNotes } from "@prisma/client";

export type TypeNewSecureNotes = Omit<ISecureNotes, "id">;