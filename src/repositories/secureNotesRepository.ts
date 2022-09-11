import prisma from "../dbStrategy/database.js";

import { TypeNewSecureNotes } from "../types/secureNotesTypes.js";

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

export async function getUserSecureNotes(userId: number) {
  return prisma.secureNotes.findMany({
    where: { userId }
  });
}

export async function findSecureNoteById(secureNoteId: number) {
  return prisma.secureNotes.findFirst({
    where: { id: secureNoteId }
  });
}

export async function deleteSecureNote(secureNoteId: number) {
  return prisma.secureNotes.delete({
    where: { id: secureNoteId }
  });
}