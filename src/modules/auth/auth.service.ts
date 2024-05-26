import { Injectable } from "@nestjs/common";
import { CallbackMode, Env, OAuthProvider } from "@utils";
import { GoogleService } from "./modules/google";
import { MissingEmailError, MissingGoogleIdTokenError } from "./errors";
import { AccountsService } from "@modules/accounts";
import { GetLoginUriQuery } from "./dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly googleService: GoogleService,
        private readonly accountsService: AccountsService
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

    async getGoogleTokenInfo(code: string) {
        const token = await this.googleService.getToken({
            clientId: Env.GOOGLE_CLIENT_ID,
            clientSecret: Env.GOOGLE_CLIENT_SECRET,
            code: code,
            grantType: "authorization_code",
            redirectUri: Env.GOOGLE_SIGN_UP_REDIRECT_URI
        });

        if (!token.id_token) throw new MissingGoogleIdTokenError();

        const tokenInfo = await this.googleService.getTokenInfo(token.id_token);
        console.log(tokenInfo)
        return tokenInfo;
    }

    async loginWithGoogle(code: string) {
        const tokenInfo = await this.getGoogleTokenInfo(code);
        if (!tokenInfo.email) throw new MissingEmailError();

        console.log(tokenInfo);
    }

    async signUpWithGoogle(code: string) {
        const tokenInfo = await this.getGoogleTokenInfo(code);
        if (!tokenInfo.email) throw new MissingEmailError();

        // const account = await this.accountsService.create({
        //     email: tokenInfo.email,
        //     password: ""
        // });

        console.log(tokenInfo);
    }
}