import { Injectable } from "@nestjs/common";
import { CallbackMode, Env, OAuthProvider } from "@utils";
import { GoogleService } from "./modules/google";
import { MissingEmailError, MissingGoogleIdTokenError } from "./errors";
import { AccountsService } from "@modules/accounts";
import { GetLoginUriQuery } from "./dto";
import { CryptoService } from "@modules/crypto";
import { Account } from "@schemas";

@Injectable()
export class AuthService {
    constructor(
        private readonly googleService: GoogleService,
        private readonly accountsService: AccountsService,
        private readonly cryptoService: CryptoService
    ) {}

    getLoginUri(query: GetLoginUriQuery) {
        switch (query.provider) {
            case OAuthProvider.GOOGLE:
                return this.googleService.getOauth2Uri({
                    clientId: Env.GOOGLE_CLIENT_ID,
                    redirectUri: query.callbackMode == CallbackMode.LOGIN ? Env.GOOGLE_LOGIN_REDIRECT_URI : Env.GOOGLE_SIGN_UP_REDIRECT_URI,
                    responseType: "code",
                    scopes: [GoogleService.SCOPE_EMAIL, GoogleService.SCOPE_PROFILE]
                });
        }
    }

    async getGoogleTokenInfo(code: string, mode: CallbackMode) {
        const token = await this.googleService.getToken({
            clientId: Env.GOOGLE_CLIENT_ID,
            clientSecret: Env.GOOGLE_CLIENT_SECRET,
            code: code,
            grantType: "authorization_code",
            redirectUri: mode == CallbackMode.LOGIN ? Env.GOOGLE_LOGIN_REDIRECT_URI : Env.GOOGLE_SIGN_UP_REDIRECT_URI
        });

        if (!token.id_token) throw new MissingGoogleIdTokenError();

        const tokenInfo = await this.googleService.getTokenInfo(token.id_token);
        return tokenInfo;
    }

    async loginWithGoogle(code: string): Promise<[Account, string]> {
        const tokenInfo = await this.getGoogleTokenInfo(code, CallbackMode.LOGIN);
        if (!tokenInfo.email) throw new MissingEmailError();

        const account = await this.accountsService.getOneByEmail(tokenInfo.email);
        const accessToken = this.cryptoService.signJwtToken(account._id.toString());

        return [account, accessToken]
    }

    async signUpWithGoogle(code: string): Promise<[Account, string]> {
        const tokenInfo = await this.getGoogleTokenInfo(code, CallbackMode.SIGN_UP);
        if (!tokenInfo.email) throw new MissingEmailError();

        const account = await this.accountsService.create({
            email: tokenInfo.email,
            password: await this.cryptoService.hashPassword(this.cryptoService.generateRandomPassword())
        });

        const accessToken = this.cryptoService.signJwtToken(account._id.toString());
        return [account, accessToken];
    }
}