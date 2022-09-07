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