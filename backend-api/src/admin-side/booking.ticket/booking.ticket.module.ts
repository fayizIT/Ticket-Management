import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.ticket.service';
import { BookingController } from './booking.ticket.controller';
import { Booking, BookingSchema } from './entities/booking.ticket.entity';
import { TicketCategoryModule } from '../ticket.category/ticket.category.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    TicketCategoryModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingTicketModule {}
