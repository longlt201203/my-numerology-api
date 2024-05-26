import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { GetLoginUriQuery } from "./dto";

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
    async signUpWithGoogle(@Query("code") code: string) {
        const data = await this.authService.signUpWithGoogle(code);
        return "OK";
    }

    @Get("login-google")
    async loginWithGoogle(@Query("code") code: string) {
        const data = await this.authService.loginWithGoogle(code);
        return "OK";
    }
}