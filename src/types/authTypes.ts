import { users as IUsers } from "@prisma/client";

export type TypeNewUser = Omit<IUsers, "id">;

export interface IToken {
    userId: number;
}