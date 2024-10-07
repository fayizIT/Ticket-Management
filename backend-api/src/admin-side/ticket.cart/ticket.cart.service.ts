// src/admin-side/ticket/ticket.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './entities/ticket.cart.entity'; 
import { CreateTicketDto } from './dto/create-ticket.cart.dto'; 
import { UpdateTicketDto } from './dto/update-ticket.cart.dto'; 
import { AgeCategory } from '../age.category/entities/age.category.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    @InjectModel(AgeCategory.name) private ageCategoryModel: Model<AgeCategory>, // Inject AgeCategory model
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ageCategory = await this.ageCategoryModel.findById(createTicketDto.ageCategoryId);
    if (!ageCategory) {
      throw new NotFoundException(`Age Category with ID ${createTicketDto.ageCategoryId} not found`);
    }

    const newTicket = new this.ticketModel(createTicketDto);
    return newTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    return this.ticketModel.findById(id).exec();
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketModel.findByIdAndUpdate(id, updateTicketDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Ticket> {
    return this.ticketModel.findByIdAndDelete(id).exec();
  }
}
