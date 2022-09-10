import { Request, Response } from "express";

import * as networksService from "../services/networksService.js";

export async function createNetwork(req: Request, res: Response) {
    const { user } = res.locals;
    const newNetwork = req.body;

    await networksService.createNetwork({ ...newNetwork, userId: user.id });

    res.status(201).send("Network created successfully.");
}

export async function getAllNetworks(req: Request, res: Response) {
    const { user } = res.locals;

    const networks = await networksService.getAllNetworks(user.id);

    res.status(200).send(networks);
}

export async function getNetworkById(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;

    const network = await networksService.getNetworkById(user.id, Number(id));

    res.status(200).send(network);
}

export async function deleteNetwork(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;

    await networksService.deleteNetwork(user.id, Number(id));

    res.status(200).send("Network deleted successfully.");
}
