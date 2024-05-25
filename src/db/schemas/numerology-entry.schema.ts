import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NumerologyEntryTypeEnum } from "@utils";
import { HydratedDocument, SchemaTypes } from "mongoose";
import { NumerologyEntryDescription, NumerologyEntryDescriptionSchema } from "./numerology-entry-description.schema";

export type NumerologyEntryDocument = HydratedDocument<NumerologyEntry>;
@Schema()
export class NumerologyEntry {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.String, enum: NumerologyEntryTypeEnum })
    type: NumerologyEntryTypeEnum;

    @Prop({ type: SchemaTypes.Number })
    number: number;

    @Prop({ type: [{ type: NumerologyEntryDescriptionSchema }] })
    description: NumerologyEntryDescription[];
}

export const NumerologyEntrySchema = SchemaFactory.createForClass(NumerologyEntry);