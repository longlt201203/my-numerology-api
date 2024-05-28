import { CreateLanguageDto } from "./dto";
import { LanguageNotFoundError } from "./errors";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Language } from "@schemas";
import { Model } from "mongoose";

@Injectable()
export class LanguageService {
    constructor(
        @InjectModel(Language.name)
        private readonly languageModel: Model<Language>
    ) {}

    async getOneByCode(code: string) {
        const language = await this.languageModel.findOne({ code: code });
        if (!language) throw new LanguageNotFoundError();
        return language;
    }

    async createOne(dto: CreateLanguageDto) {
        let language = new this.languageModel({
            code: dto.code,
            name: dto.name
        });
        language = await language.save();
        return language;
    }

    async getAll() {
        return this.languageModel.find();
    }
}