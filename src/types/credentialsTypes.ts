import { credentials as ICredencial } from "@prisma/client";

export type TypeNewCredential = Omit<ICredencial, "id">;