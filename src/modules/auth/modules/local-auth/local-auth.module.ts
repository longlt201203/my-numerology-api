import { LocalAuthService } from "./local-auth.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    providers: [LocalAuthService],
    exports: [LocalAuthService]
})
export class LocalAuthModule {
}