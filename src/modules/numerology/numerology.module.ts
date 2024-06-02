import { Module } from "@nestjs/common";
import { NumerologyController } from "./numerology.controller";
import { NumerologyService } from "./numerology.service";
import { MongooseModule } from "@nestjs/mongoose";
import { NumerologyCalculateExplain, NumerologyCalculateExplainSchema, NumerologyEntry, NumerologyEntrySchema, NumerologyExplain, NumerologyExplainSchema, NumerologyNumberMeaning, NumerologyNumberMeaningSchema } from "@schemas";
import { LanguageModule } from "@modules/language";

@Module({
    controllers: [NumerologyController],
    providers: [NumerologyService],
    imports: [MongooseModule.forFeature([
        { name: NumerologyEntry.name, schema: NumerologyEntrySchema },
        { name: NumerologyCalculateExplain.name, schema: NumerologyCalculateExplainSchema },
        { name: NumerologyExplain.name, schema: NumerologyExplainSchema },
        { name: NumerologyNumberMeaning.name, schema: NumerologyNumberMeaningSchema },
    ]), LanguageModule]
})
export class NumerologyModule {}