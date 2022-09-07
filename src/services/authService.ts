import bcrypt from "bcrypt";

import { users } from "@prisma/client";
import * as authRepository from "../repositories/authRepository.js";

export type TypeNewUser = Omit<users, "id">; 

export async function signUp(newUser: TypeNewUser) {
    const encryptedPassword = bcrypt.hashSync(newUser.password, 10);

    await authRepository.insertNewUser({...newUser, password: encryptedPassword})
}

