import { Module } from "@nestjs/common";
import { NumerologyController } from "./numerology.controller";
import { NumerologyService } from "./numerology.service";
import { MongooseModule } from "@nestjs/mongoose";
import { NumerologyCalculateExplain, NumerologyCalculateExplainSchema, NumerologyEntry, NumerologyEntryDescription, NumerologyEntryDescriptionSchema, NumerologyEntrySchema, NumerologyExplain, NumerologyExplainSchema } from "@schemas";
import { LanguageModule } from "@modules/language";

@Module({
    controllers: [NumerologyController],
    providers: [NumerologyService],
    imports: [MongooseModule.forFeature([
        { name: NumerologyEntry.name, schema: NumerologyEntrySchema },
        { name: NumerologyEntryDescription.name, schema: NumerologyEntryDescriptionSchema },
        { name: NumerologyCalculateExplain.name, schema: NumerologyCalculateExplainSchema },
        { name: NumerologyExplain.name, schema: NumerologyExplainSchema },
    ]), LanguageModule]
})
export class NumerologyModule {}