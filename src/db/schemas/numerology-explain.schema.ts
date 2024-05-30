import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NumerologyExplainType } from "@utils";
import { SchemaTypes, Types } from "mongoose";
import { Language } from "src/db/schemas/language.schema";

@Schema()
export class NumerologyExplain {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: Types.ObjectId;

    @Prop({ type: SchemaTypes.String, enum: NumerologyExplainType })
    type: NumerologyExplainType;

    @Prop({ type: SchemaTypes.ObjectId, ref: "Language" })
    lang: Language;

    @Prop({ type: SchemaTypes.String })
    content: string;
}

export const NumerologyExplainSchema = SchemaFactory.createForClass(NumerologyExplain);