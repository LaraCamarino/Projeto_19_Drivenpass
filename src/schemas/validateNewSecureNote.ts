import joi from "joi";
import { Request, Response, NextFunction } from "express";

export default async function validateNewSecureNote(req: Request, res: Response, next: NextFunction) {
    const newSecureNote = req.body;

    const newSecureNoteSchema = joi.object({
        title: joi.string().max(50).required(),
        description: joi.string().max(1000).required()
    });

    const validation = newSecureNoteSchema.validate(newSecureNote, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }

    next();
}