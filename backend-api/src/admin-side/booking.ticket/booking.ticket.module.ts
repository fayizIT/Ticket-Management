import { Module } from '@nestjs/common';
import { BookingTicketService } from './booking.ticket.service';
import { BookingTicketController } from './booking.ticket.controller';

@Module({
  controllers: [BookingTicketController],
  providers: [BookingTicketService],
})
export class BookingTicketModule {}
