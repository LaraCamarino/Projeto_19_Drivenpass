import { Request, Response } from "express";

import * as credentialsService from "../services/credentialsService.js";

export async function createCredential(req: Request, res: Response) {
    const { user } = res.locals;
    const credentialData = req.body;

    const newCredential = { ...credentialData, userId: user.id };

    await credentialsService.createCredential(newCredential);

    res.status(201).send("Credential created successfully.");
}

export async function getAllCredentials(req: Request, res: Response) {
    const { user } = res.locals;

    const credentials = await credentialsService.getAllCredentials(user.id);

    res.status(200).send(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;

    const credential = await credentialsService.getCredentialById(user.id, Number(id));

    res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;

    await credentialsService.deleteCredential(user.id, Number(id));

    res.status(200).send("Credential deleted successfully.");
}