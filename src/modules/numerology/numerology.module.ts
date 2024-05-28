import { Module } from "@nestjs/common";
import { NumerologyController } from "./numerology.controller";
import { NumerologyService } from "./numerology.service";
import { MongooseModule } from "@nestjs/mongoose";
import { NumerologyEntry, NumerologyEntryDescription, NumerologyEntryDescriptionSchema, NumerologyEntrySchema } from "@schemas";
import { LanguageModule } from "@modules/language";

@Module({
    controllers: [NumerologyController],
    providers: [NumerologyService],
    imports: [MongooseModule.forFeature([
        { name: NumerologyEntry.name, schema: NumerologyEntrySchema },
        { name: NumerologyEntryDescription.name, schema: NumerologyEntryDescriptionSchema },
    ]), LanguageModule]
})
export class NumerologyModule {}