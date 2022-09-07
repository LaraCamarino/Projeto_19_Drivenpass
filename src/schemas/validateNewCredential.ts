import joi from "joi";
import { Request, Response, NextFunction } from "express";

export default async function validateNewCredential(req: Request, res: Response, next: NextFunction) {
    const newCredential = req.body;

    const newCredentialSchema = joi.object({
        title: joi.string().required(),
        url: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required()
    });

    const validation = newCredentialSchema.validate(newCredential, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }

    next();
}