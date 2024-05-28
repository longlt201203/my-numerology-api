import { MongooseModule } from "@nestjs/mongoose";
import { LanguageController } from "./language.controller";
import { LanguageService } from "./language.service";
import { Module } from "@nestjs/common";
import { Language, LanguageSchema } from "@schemas";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Language.name, schema: LanguageSchema }
    ])],
    providers: [LanguageService],
    exports: [LanguageService],
    controllers: [LanguageController]
})
export class LanguageModule {}