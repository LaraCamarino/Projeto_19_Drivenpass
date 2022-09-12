import { Request, Response } from "express";

import * as secureNotesService from "../services/secureNotesService.js";

export async function createSecureNote(req: Request, res: Response) {
    const { user } = res.locals;
    const newSecureNote = req.body;

    await secureNotesService.createSecureNote({ ...newSecureNote, userId: user.id });
    res.status(201).send("Secure note created successfully.");
}

export async function getAllSecureNotes(req: Request, res: Response) {
    const { user } = res.locals;

    const secureNotes = await secureNotesService.getAllSecureNotes(user.id);
    
    res.status(200).send(secureNotes);
}

export async function getSecureNoteById(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;

    if(isNaN(Number(id))) {
        throw {
            type: "unprocessable_entity",
            message: "The ID must be a number."
        };
    }

    const secureNote = await secureNotesService.getSecureNoteById(user.id, Number(id));
    
    res.status(200).send(secureNote);
}

export async function deleteSecureNote(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;

    if(isNaN(Number(id))) {
        throw {
            type: "unprocessable_entity",
            message: "The ID must be a number."
        };
    }

    await secureNotesService.deleteSecureNote(user.id, Number(id));

    res.status(200).send("Secure note deleted successfully.");
}