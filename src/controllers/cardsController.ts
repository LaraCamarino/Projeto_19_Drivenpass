import { Request, Response } from "express";

import * as cardsService from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
    const { user } = res.locals;
    const newCard = req.body;

    await cardsService.createCard({ ...newCard, userId: user.id });

    res.status(201).send("Card created successfully.");
}

export async function getAllCards(req: Request, res: Response) {
    const { user } = res.locals;

    const cards = await cardsService.getAllCards(user.id);

    res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;

    const card = await cardsService.getCardById(user.id, Number(id));

    res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;

    await cardsService.deleteCard(user.id, Number(id));

    res.status(200).send("Card deleted successfully.");
}