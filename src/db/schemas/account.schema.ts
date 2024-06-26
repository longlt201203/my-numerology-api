import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: Types.ObjectId;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);