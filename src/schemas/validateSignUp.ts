import joi from "joi";
import { Request, Response, NextFunction } from "express";

import * as authRepository from "../repositories/authRepository.js";

export default async function validateSignUp(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;

    const newUserSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(10).required()
    });

    const validation = newUserSchema.validate(newUser, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }
    
    const emailInUse = await authRepository.findByEmail(newUser.email)
    if (emailInUse) {
        throw {
            type: "conflict",
            message: "This e-mail is alrealdy in use."
        };
    }

    next();
}