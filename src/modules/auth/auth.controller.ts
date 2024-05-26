import { Controller, Get, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ApiResponseDto, Env, SwaggerApiResponse } from "@utils";
import { AuthenticateResponseDto, GetLoginUriQuery } from "./dto";
import { AccountResponseDto } from "@modules/accounts/dto";
import { Response } from "express";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Get("uri")
    @SwaggerApiResponse(String)
    getLoginUri(@Query() query: GetLoginUriQuery) {
        return new ApiResponseDto(this.authService.getLoginUri(query));
    }

    @Get("sign-up-google")
    async signUpWithGoogle(@Query("code") code: string, @Res() res: Response) {
        const [account, accessToken] = await this.authService.signUpWithGoogle(code);
        res.cookie("accessToken", accessToken);
        res.redirect(Env.APP_REDIRECT_URI);
        // return new ApiResponseDto<AuthenticateResponseDto>({ account: AccountResponseDto.fromEntity(account), accessToken: accessToken });
    }

    @Get("login-google")
    async loginWithGoogle(@Query("code") code: string, @Res() res: Response) {
        const [account, accessToken] = await this.authService.loginWithGoogle(code);
        res.cookie("accessToken", accessToken);
        res.redirect(Env.APP_REDIRECT_URI);
        // return new ApiResponseDto<AuthenticateResponseDto>({ account: AccountResponseDto.fromEntity(account), accessToken: accessToken });
    }
}