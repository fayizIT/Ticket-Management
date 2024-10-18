// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true }) // Ensure email is unique
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  pinCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
