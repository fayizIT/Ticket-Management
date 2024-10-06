// src/modules/adminSide/admin.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true, unique: true }) // Change username to email
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 }) 
  isAdmin: number;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
