import { Account } from "@schemas";

export class AccountResponseDto {
    id: string
    email: string;

    static fromEntity(entity: Account): AccountResponseDto {
        return {
            id: entity._id,
            email: entity.email
        }
    }
}