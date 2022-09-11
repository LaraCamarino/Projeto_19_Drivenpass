import { networks as INetworks } from "@prisma/client";

export type TypeNewNetwork = Omit<INetworks, "id">;