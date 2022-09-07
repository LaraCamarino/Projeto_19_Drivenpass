import prisma from "../dbStrategy/database.js";

import { TypeNewUser } from "../services/authService.js";

export async function findUserById(id: number) {
  return prisma.users.findUnique({
    where: { id }
  });
}

export async function findByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email }
    });
}

export async function insertNewUser(newUser: TypeNewUser) {
    return prisma.users.create({
      data: newUser,
    });
  }
