import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NumerologyEntryTypeEnum } from "@utils";
import { HydratedDocument } from "mongoose";

export type NumerologyEntryDocument = HydratedDocument<NumerologyEntry>;

@Schema()
export class NumerologyEntry {
    @Prop({ type: Number, enum: NumerologyEntryTypeEnum })
    type: NumerologyEntryTypeEnum;

    @Prop({ type: Number })
    number: number;

    @Prop({ type: Object })
    description: any;

}

export const NumerologyEntrySchema = SchemaFactory.createForClass(NumerologyEntry);