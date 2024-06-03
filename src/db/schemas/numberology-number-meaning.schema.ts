import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Language } from "./language.schema";

@Schema()
export class NumerologyNumberMeaning {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: Types.ObjectId;

    @Prop({ type: SchemaTypes.Number })
    number: number;

    @Prop({ type: SchemaTypes.ObjectId })
    lang: Language;

    @Prop({ type: SchemaTypes.String })
    content: string;
}

export const NumerologyNumberMeaningSchema = SchemaFactory.createForClass(NumerologyNumberMeaning);