import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NumerologyEntryType } from "@utils";
import { SchemaTypes, Types } from "mongoose";
import { Language } from "src/db/schemas/language.schema";

@Schema()
export class NumerologyCalculateExplain {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: Types.ObjectId;

    @Prop({ type: SchemaTypes.String, enum: NumerologyEntryType })
    type: NumerologyEntryType;

    @Prop({ type: SchemaTypes.ObjectId, ref: "Language" })
    lang: Language;

    @Prop({ type: SchemaTypes.String })
    content: string;
}

export const NumerologyCalculateExplainSchema = SchemaFactory.createForClass(NumerologyCalculateExplain);