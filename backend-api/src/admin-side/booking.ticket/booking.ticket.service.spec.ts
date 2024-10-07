import { Test, TestingModule } from '@nestjs/testing';
import { BookingTicketService } from './booking.ticket.service';

describe('BookingTicketService', () => {
  let service: BookingTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingTicketService],
    }).compile();

    service = module.get<BookingTicketService>(BookingTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
