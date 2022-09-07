import prisma from "../dbStrategy/database.js";

import { TypeNewCredential } from "../services/credentialsService.js";

export async function findCredentialByTitle(title: string, userId: number) {
    return prisma.credentials.findFirst({
      where: { title, userId }
    });
}

export async function findCredentialByUrl(url: string, userId: number) {
  return prisma.credentials.findMany({
    where: { url, userId }
  });
}

export async function insertNewCredential(newCredential: TypeNewCredential) {
  return prisma.credentials.create({
    data: newCredential
  })
}