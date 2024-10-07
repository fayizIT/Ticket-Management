import { Injectable } from '@nestjs/common';
import { CreateBookingTicketDto } from './dto/create-booking.ticket.dto';
import { UpdateBookingTicketDto } from './dto/update-booking.ticket.dto';

@Injectable()
export class BookingTicketService {
  create(createBookingTicketDto: CreateBookingTicketDto) {
    return 'This action adds a new bookingTicket';
  }

  findAll() {
    return `This action returns all bookingTicket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingTicket`;
  }

  update(id: number, updateBookingTicketDto: UpdateBookingTicketDto) {
    return `This action updates a #${id} bookingTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingTicket`;
  }
}
