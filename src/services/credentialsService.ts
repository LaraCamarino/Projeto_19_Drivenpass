import Cryptr from "cryptr";

import * as credentialsRepository from "../repositories/credentialsRepository.js";

import { credentials as ICredencial } from "@prisma/client";
export type TypeNewCredential = Omit<ICredencial, "id">;

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
    if (credentialsByUrl.length === 2) {
        throw {
            type: "conflict",
            message: "This URL already has two credentials registered."
        };
    }

    const encryptedPassword = cryptr.encrypt(newCredential.password);
    await credentialsRepository.insertNewCredential({ ...newCredential, password: encryptedPassword });
}

export async function getAllCredentials(userId: number) {
    const credentials = await credentialsRepository.getUserCredentials(userId);

    return credentials.map((credential) => {
        return { ...credential, password: cryptr.decrypt(credential.password) }
    });
}

export async function getCredentialById(userId: number, credentialId: number) {
    const credential = await credentialsRepository.findCredentialById(credentialId);
    
    await verifyExistingCredential(credential);
    await verifyCredentialOwner(credential, userId);
    
    return { ...credential, password: cryptr.decrypt(credential.password) };
}

export async function deleteCredential(userId: number, credentialId: number) {
    const credential = await credentialsRepository.findCredentialById(credentialId);

    await verifyExistingCredential(credential);
    await verifyCredentialOwner(credential, userId);

    await credentialsRepository.deleteCredential(credentialId); 
}

async function verifyExistingCredential(credential: ICredencial) {
    if (!credential) {
        throw {
            type: "not_found",
            message: "No credential was found."
        };
    }
}

async function verifyCredentialOwner(credential: ICredencial, userId: number) {
    if(credential.userId !== userId) {
        throw {
            type: "unauthorized",
            message: "This user is not the owner of the credential."
        };
    }
}