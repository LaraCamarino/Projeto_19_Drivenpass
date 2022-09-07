import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const newUser = req.body;

    await authService.signUp(newUser);
    res.status(201).send("User registered successfully.");
}