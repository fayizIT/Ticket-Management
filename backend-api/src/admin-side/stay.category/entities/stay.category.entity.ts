import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StayCategoryDocument = StayCategory & Document;

@Schema({ timestamps: true })  
export class StayCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;
}

export const StayCategorySchema = SchemaFactory.createForClass(StayCategory);
