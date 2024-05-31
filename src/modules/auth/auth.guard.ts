import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        console.log(this.retrieveAccessToken(request));
        return true;
    }

    retrieveAccessToken(request: Request) {
        return request.cookies.accessToken
    }
}