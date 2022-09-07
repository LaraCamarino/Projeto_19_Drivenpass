import Cryptr from "cryptr";

import * as credentialsRepository from "../repositories/credentialsRepository.js";

import { credentials } from "@prisma/client";
export type TypeNewCredential = Omit<credentials, "id">;

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

export async function createCredential(newCredential: TypeNewCredential) {

    const existingTitle = await credentialsRepository.findCredentialByTitle(newCredential.title, newCredential.userId);
    if (existingTitle) {
        throw {
            type: "conflict",
            message: "This credential title is already in use."
        };
    }

    const credentialsByUrl = await credentialsRepository.findCredentialByUrl(newCredential.url, newCredential.userId);
    if(credentialsByUrl.length === 2) {
        throw {
            type: "conflict",
            message: "This URL already has two credentials registered."
        };
    }

    const encryptedPassword = cryptr.encrypt(newCredential.password);
    await credentialsRepository.insertNewCredential({ ...newCredential, password: encryptedPassword });
}

