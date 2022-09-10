import prisma from "../dbStrategy/database.js";

import { TypeNewNetwork } from "../services/networksService.js";

export async function insertNewNetwork(newNetwork: TypeNewNetwork) {
    return prisma.networks.create({
        data: newNetwork
      })
}

export async function getUserNetworks(userId: number) {
    return prisma.networks.findMany({
      where: { userId }
    });
}

export async function findNetworkById(networkId: number) {
    return prisma.networks.findFirst({
      where: { id: networkId }
    });
  }

export async function deleteNetwork(networkId: number) {
    return prisma.networks.delete({
      where: { id: networkId }
    });
  }