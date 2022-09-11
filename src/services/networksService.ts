import Cryptr from "cryptr";

import * as networksRepository from "../repositories/networksRepository.js";
import { networks as INetworks } from "@prisma/client";
import { TypeNewNetwork } from "../types/networksTypes.js";

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

export async function createNetwork(newNetwork: TypeNewNetwork) {
    const encryptedPassword = cryptr.encrypt(newNetwork.password);

    await networksRepository.insertNewNetwork({ ...newNetwork, password: encryptedPassword });
}

export async function getAllNetworks(userId: number) {
    const networks: INetworks[] = await networksRepository.getUserNetworks(userId);

    return networks.map((network) => {
        return { ...network, password: cryptr.decrypt(network.password) }
    });
}

export async function getNetworkById(userId: number, networkId: number) {
    const network: INetworks = await networksRepository.findNetworkById(networkId);

    await verifyExistingNetwork(network);
    await verifyNetworkOwner(network, userId);

    return { ...network, password: cryptr.decrypt(network.password) };
}

export async function deleteNetwork(userId: number, networkId: number) {
    const network: INetworks = await networksRepository.findNetworkById(networkId);

    await verifyExistingNetwork(network);
    await verifyNetworkOwner(network, userId);

    await networksRepository.deleteNetwork(networkId);
}

async function verifyExistingNetwork(network: INetworks) {
    if (!network) {
        throw {
            type: "not_found",
            message: "No network was found."
        };
    }
}

async function verifyNetworkOwner(network: INetworks, userId: number) {
    if (network.userId !== userId) {
        throw {
            type: "unauthorized",
            message: "This user is not the owner of the network."
        };
    }
}
