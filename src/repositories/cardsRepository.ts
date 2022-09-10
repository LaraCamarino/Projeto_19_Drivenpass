import prisma from "../dbStrategy/database.js";

import { TypeNewCard } from "../services/cardsService.js";

export async function findCardByTitle(title: string, userId: number) {
    return prisma.cards.findFirst({
        where: { title, userId }
      });
}

export async function insertNewCard(newCard: TypeNewCard) {
    return prisma.cards.create({
        data: newCard
      })
}

export async function getUserCards(userId: number) {
    return prisma.cards.findMany({
      where: { userId }
    });
}

export async function findCardById(cardId: number) {
    return prisma.cards.findFirst({
      where: { id: cardId }
    });
  }

export async function deleteCard(cardId: number) {
    return prisma.cards.delete({
      where: { id: cardId }
    });
  }