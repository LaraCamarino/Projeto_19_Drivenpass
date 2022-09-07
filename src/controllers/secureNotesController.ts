import { Request, Response } from "express";

import * as secureNotesService from "../services/secureNotesService.js";

export async function createSecureNote(req: Request, res: Response) {
    const { user } = res.locals;
    const newSecureNote = req.body;

    await secureNotesService.createSecureNote({ ...newSecureNote, userId: user.id });
    res.status(201).send("Secure note created successfully.");
}
