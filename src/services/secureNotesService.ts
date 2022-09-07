import * as secureNotesRepository from "../repositories/secureNotesRepository.js";

import { secureNotes as ISecureNotes } from "@prisma/client";
export type TypeNewSecureNotes = Omit<ISecureNotes, "id">;

export async function createSecureNote(newSecureNote: TypeNewSecureNotes) {
    const existingTitle = await secureNotesRepository.findSecureNoteByTitle(newSecureNote.title, newSecureNote.userId);
    if (existingTitle) {
        throw {
            type: "conflict",
            message: "This secure note title is already in use."
        };
    }

    await secureNotesRepository.insertNewSecureNote(newSecureNote);
}

export async function getAllSecureNotes(userId: number) {
    const secureNotes = await secureNotesRepository.getUserSecureNotes(userId);

    return secureNotes;
}

export async function getSecureNoteById(userId: number, secureNoteId: number) {
    const secureNote = await secureNotesRepository.findSecureNoteById(secureNoteId);

    await verifyExistingSecureNote(secureNote);
    await verifySecureNoteOwner(secureNote, userId);

    return secureNote;
}

export async function deleteSecureNote(userId: number, secureNoteId: number) {
    const secureNote = await secureNotesRepository.findSecureNoteById(secureNoteId);

    await verifyExistingSecureNote(secureNote);
    await verifySecureNoteOwner(secureNote, userId);

    await secureNotesRepository.deleteSecureNote(secureNoteId)
}

async function verifyExistingSecureNote(secureNote: ISecureNotes) {
    if (!secureNote) {
        throw {
            type: "not_found",
            message: "No secure note was found."
        };
    }
}

async function verifySecureNoteOwner(secureNote: ISecureNotes, userId: number) {
    if(secureNote.userId !== userId) {
        throw {
            type: "unauthorized",
            message: "This user is not the owner of the secure note."
        };
    }
}
