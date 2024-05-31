import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NumerologyEntryType } from "@utils";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Language } from "src/db/schemas/language.schema";

export type NumerologyEntryDocument = HydratedDocument<NumerologyEntry>;
@Schema()
export class NumerologyEntry {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: Types.ObjectId;

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
}

export const NumerologyEntrySchema = SchemaFactory.createForClass(NumerologyEntry);