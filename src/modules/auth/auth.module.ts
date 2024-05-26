import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "./modules/google";
import { AccountsModule } from "@modules/accounts";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [GoogleModule, AccountsModule]
})
export class AuthModule {}