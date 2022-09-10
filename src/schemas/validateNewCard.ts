import joi from "joi";
import { Request, Response, NextFunction } from "express";

export default async function validateNewCard(req: Request, res: Response, next: NextFunction) {
    const newCard = req.body;

    const newCardSchema = joi.object({
        title: joi.string().required(),
        number: joi.string().required(),
        cardholderName: joi.string().required(),
        securityCode: joi.string().max(3).required(),
        expirationDate: joi.string().required(),
        password: joi.string().required(),
        isVirtual: joi.boolean().required(),
        type: joi.string().required(),
    });

    const validation = newCardSchema.validate(newCard, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }

    next();
}