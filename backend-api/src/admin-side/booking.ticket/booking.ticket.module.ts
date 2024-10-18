import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.ticket.service'; 
import { BookingController } from './booking.ticket.controller'; 
import { Coupon, CouponSchema } from 'src/admin-side/coupon/entities/coupon.entity';
import { TicketCategory, TicketCategorySchema } from 'src/admin-side/ticket.category/entities/ticket.category.entity';
import { StayCategory, StayCategorySchema } from 'src/admin-side/stay.category/entities/stay.category.entity';
import { Booking, BookingSchema } from './entities/booking.ticket.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
        MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
        MongooseModule.forFeature([{ name: TicketCategory.name, schema: TicketCategorySchema }]),
        MongooseModule.forFeature([{ name: StayCategory.name, schema: StayCategorySchema }]),
    ],
    controllers: [BookingController],
    providers: [BookingService],
})
export class BookingModule {}

