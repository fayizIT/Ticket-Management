// src/admin-side/ticket/ticket.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { TicketService } from './ticket.cart.service'; 
import { CreateTicketDto } from './dto/create-ticket.cart.dto'; 
import { UpdateTicketDto } from './dto/update-ticket.cart.dto'; 
import { Ticket } from './entities/ticket.cart.entity'; 
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.remove(id);
  }
}
