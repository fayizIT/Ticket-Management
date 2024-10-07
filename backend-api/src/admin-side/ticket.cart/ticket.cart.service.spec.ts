import { Test, TestingModule } from '@nestjs/testing';
import { TicketCartService } from './ticket.cart.service';

describe('TicketCartService', () => {
  let service: TicketCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketCartService],
    }).compile();

    service = module.get<TicketCartService>(TicketCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
