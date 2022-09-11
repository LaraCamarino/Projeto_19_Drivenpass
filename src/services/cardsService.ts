import Cryptr from "cryptr";

import * as cardsRepository from "../repositories/cardsRepository.js";
import { cards as ICards } from "@prisma/client";
import { TypeNewCard } from "../types/cardsTypes.js";

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

export async function createCard(newCard: TypeNewCard) {
    const existingTitle = await cardsRepository.findCardByTitle(newCard.title, newCard.userId);
    if (existingTitle) {
        throw {
            type: "conflict",
            message: "This card title is already in use."
        };
    }

    const encryptedPassword = cryptr.encrypt(newCard.password);
    const encryptedSecurityCode = cryptr.encrypt(newCard.securityCode);

    await cardsRepository.insertNewCard({ ...newCard, password: encryptedPassword, securityCode: encryptedSecurityCode });
}

export async function getAllCards(userId: number) {
    const cards = await cardsRepository.getUserCards(userId);

    return cards.map((card) => {
        return { ...card, password: cryptr.decrypt(card.password), securityCode: cryptr.decrypt(card.securityCode) }
    });
}

export async function getCardById(userId: number, cardlId: number) {
    const card = await cardsRepository.findCardById(cardlId);
    
    await verifyExistingCard(card);
    await verifyCardOwner(card, userId);

    return { ...card, password: cryptr.decrypt(card.password), securityCode: cryptr.decrypt(card.securityCode) };
}

export async function deleteCard(userId: number, cardlId: number) {
    const card = await cardsRepository.findCardById(cardlId);

    await verifyExistingCard(card);
    await verifyCardOwner(card, userId);

    await cardsRepository.deleteCard(cardlId);
}

async function verifyExistingCard(card: ICards) {
    if (!card) {
        throw {
            type: "not_found",
            message: "No card was found."
        };
    }
}

async function verifyCardOwner(card: ICards, userId: number) {
    if(card.userId !== userId) {
        throw {
            type: "unauthorized",
            message: "This user is not the owner of the card."
        };
    }
}