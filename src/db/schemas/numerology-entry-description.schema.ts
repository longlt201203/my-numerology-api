import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LanguageType } from "@utils";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type NumerologyEntryDescriptionDocument = HydratedDocument<NumerologyEntryDescription>;

@Schema()
export class NumerologyEntryDescription {
    @Prop({ type: SchemaTypes.String, enum: LanguageType })
    lang: LanguageType;

    @Prop({ type: SchemaTypes.String })
    content: string;
}

export const NumerologyEntryDescriptionSchema = SchemaFactory.createForClass(NumerologyEntryDescription);