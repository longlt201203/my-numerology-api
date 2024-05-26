import { AccountResponseDto } from "@modules/accounts/dto";

export class AuthenticateResponseDto {
    account: AccountResponseDto;
    accessToken: string;
}