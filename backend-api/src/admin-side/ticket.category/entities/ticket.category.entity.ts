import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })  
export class TicketCategory extends Document {
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })  
  price: number;
}

export const TicketCategorySchema = SchemaFactory.createForClass(TicketCategory);
