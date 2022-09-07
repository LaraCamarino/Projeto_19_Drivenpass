import prisma from "../dbStrategy/database.js";

import { TypeNewSecureNotes } from "../services/secureNotesService.js";

export async function findSecureNoteByTitle(title: string, userId: number) {
    return prisma.secureNotes.findFirst({
        where: { title, userId }
      });
}

export async function insertNewSecureNote(newSecureNote: TypeNewSecureNotes) {
    return prisma.secureNotes.create({
        data: newSecureNote
      })
}