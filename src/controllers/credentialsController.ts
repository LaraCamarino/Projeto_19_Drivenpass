import { Request, Response } from "express";

import * as credentialsService from "../services/credentialsService.js";

export async function createCredential(req: Request, res: Response) {
    const { user } = res.locals;
    const credentialData = req.body;
    
    const newCredential = {...credentialData, userId: user.id};

    await credentialsService.createCredential(newCredential);

    res.status(201).send("Credential created successfully.");
}
