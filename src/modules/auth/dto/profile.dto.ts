import { Account } from "@schemas";

export class ProfileDto {
    id: string;
    email: string;

    static fromAccount(account: Account): ProfileDto {
        return {
            id: account._id.toString(),
            email: account.email
        }
    }
}