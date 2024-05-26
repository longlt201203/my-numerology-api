import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Account } from "@schemas";
import { Model, Types } from "mongoose";
import { CreateAccountDto } from "./dto";
import { AccountExistedError, AccountNotFoundError } from "./errors";

@Injectable()
export class AccountsService {
    constructor(
        @InjectModel(Account.name)
        private readonly accountModel: Model<Account>
    ) {}

    async create(dto: CreateAccountDto) {
        const accountByEmail = await this.accountModel.findOne({
            email: dto.email
        });
        if (accountByEmail) throw new AccountExistedError();
        
        let account = new this.accountModel({
            email: dto.email,
            password: dto.password
        });

        account = await account.save();
        return account;
    }

    async getOneById(id: string) {
        if (!Types.ObjectId.isValid(id)) throw new AccountNotFoundError();
        const account = await this.accountModel.findById(id);
        if (!account) throw new AccountNotFoundError();
        return account;
    }
    
    async getOneByEmail(email: string) {
        const account = await this.accountModel.findOne({ email: email });
        if (!account) throw new AccountNotFoundError();
        return account;
    }
}