import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "./modules/google";
import { AccountsModule } from "@modules/accounts";
import { CryptoModule } from "@modules/crypto";
import { ClsModule } from "nestjs-cls";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [ClsModule.forFeature(), CryptoModule, GoogleModule, AccountsModule]
})
export class AuthModule {}