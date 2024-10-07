// src/admin-side/ticket/entities/ticket.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  ageCategoryId: string;

  @Prop({ required: true })
  quantity: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
