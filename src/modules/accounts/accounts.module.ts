import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "@schemas";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Account.name, schema: AccountSchema }
    ])],
    providers: [AccountsService],
    exports: [AccountsService]
})
export class AccountsModule {}