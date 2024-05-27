import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LanguageType, NumerologyEntryType } from "@utils";
import { HydratedDocument, SchemaTypes } from "mongoose";
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

    @Prop({ type: SchemaTypes.String, enum: LanguageType })
    lang: LanguageType;

    @Prop({ type: SchemaTypes.String })
    content: string;

    // @Prop({ type: [{ type: NumerologyEntryDescriptionSchema }] })
    // description: NumerologyEntryDescription[];
}

export const NumerologyEntrySchema = SchemaFactory.createForClass(NumerologyEntry);