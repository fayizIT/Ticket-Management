// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { TicketCategory } from 'src/admin-side/ticket.category/entities/ticket.category.entity';

// export type BookingDocument = Booking & Document;

// @Schema({ timestamps: true })
// export class Booking {
//   @Prop({ required: true })
//   fullName: string;

//   @Prop({ required: true })
//   phoneNumber: string;

//   @Prop({ required: true })
//   email: string;

//   @Prop({ required: true })
//   pinCode: string;

//   @Prop({ required: true })
//   dateOfVisit: string;

//   @Prop({ required: true })
//   totalVisitors: number;

//   @Prop({ required: true })
//   totalAmount: number;

//   @Prop({
//     type: [
//       {
//         ticketCategoryId: { type: String, required: true },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
//     required: true,
//   })
//   ticketCategories: TicketCategory[];  // Changed to AgeCategory

//   @Prop({ default: Date.now })
//   createdAt: Date;

//   @Prop({ default: Date.now })
//   updatedAt: Date;
// }

// export const BookingSchema = SchemaFactory.createForClass(Booking);

// // Nested schema for each cart item
// export class ticketCategory {  
//   ticketCategoryId: string;
//   quantity: number;
//   price: number;
// }


// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { TicketCategory } from 'src/admin-side/ticket.category/entities/ticket.category.entity'; 
// import { StayCategory } from 'src/admin-side/stay.category/entities/stay.category.entity'; 
// import { Coupon } from 'src/admin-side/coupon/entities/coupon.entity';

// export type BookingDocument = Booking & Document;

// @Schema({ timestamps: true })
// export class Booking {
//     @Prop({ required: true })
//     fullName: string;

//     @Prop({ required: true })
//     phoneNumber: string;

//     @Prop({ required: true })
//     email: string;

//     @Prop({ required: true })
//     pinCode: string;

//     @Prop({ required: true })
//     dateOfVisit: string;

//     @Prop({ required: true })
//     totalVisitors: number;

//     @Prop({ type: [{ type: Object, ref: 'TicketCategory' }], required: true })
//     ticketCategories: TicketCategory[];

//     @Prop({ type: [{ type: Object, ref: 'StayCategory' }], required: true })
//     stayCategories: StayCategory[];

//     @Prop({ required: true })
//     totalAmount: number;

//     @Prop({ required: true })
//     grandTotal: number;

//     @Prop()
//     gstAmount: number;

//     @Prop()
//     discount: number;

//     @Prop({ type: String, ref: 'Coupon' }) // Adding relation to Coupon entity
//     couponDiscountId: string;
// }

// export const BookingSchema = SchemaFactory.createForClass(Booking);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TicketCategory } from 'src/admin-side/ticket.category/entities/ticket.category.entity'; 
import { StayCategory } from 'src/admin-side/stay.category/entities/stay.category.entity'; 
import { Coupon } from 'src/admin-side/coupon/entities/coupon.entity';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    pinCode: string;

    @Prop({ required: true })
    dateOfVisit: string;

    @Prop({ required: true })
    totalVisitors: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'TicketCategory' }], required: true })
    ticketCategories: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'StayCategory' }], required: true })
    stayCategories: Types.ObjectId[];

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ required: true })
    grandTotal: number;

    @Prop()
    gstAmount: number;

    @Prop()
    discount: number;

    @Prop({ type: Types.ObjectId, ref: 'Coupon' }) 
    couponDiscountId: Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
