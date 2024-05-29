import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LanguageType, NumerologyEntryType } from "@utils";
import { HydratedDocument, SchemaTypes } from "mongoose";
import { Language } from "src/db/schemas/language.schema";
// import { NumerologyEntryDescription, NumerologyEntryDescriptionSchema } from "./numerology-entry-description.schema";

export type NumerologyEntryDocument = HydratedDocument<NumerologyEntry>;
@Schema()
export class NumerologyEntry {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.String, enum: NumerologyEntryType })
    type: NumerologyEntryType;

    @Prop({ type: SchemaTypes.Number })
    number: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: "Language" })
    lang: Language;

    @Prop({ type: SchemaTypes.String })
    content: string;

    @Prop({ type: SchemaTypes.String })
    summary: string;

    // @Prop({ type: [{ type: NumerologyEntryDescriptionSchema }] })
    // description: NumerologyEntryDescription[];
}

export const NumerologyEntrySchema = SchemaFactory.createForClass(NumerologyEntry);