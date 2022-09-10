import joi from "joi";
import { Request, Response, NextFunction } from "express";

export default async function validateNewNetwork(req: Request, res: Response, next: NextFunction) {
    const newNetwork = req.body;

    const newNetworkSchema = joi.object({
        title: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required()
    });

    const validation = newNetworkSchema.validate(newNetwork, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }

    next();
}