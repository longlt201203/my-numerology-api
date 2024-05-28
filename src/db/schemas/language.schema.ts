import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class Language {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: Types.ObjectId;
    
    @Prop({ unique: true })
    code: string;

    @Prop()
    name: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);