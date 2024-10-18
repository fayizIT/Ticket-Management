import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketCategory } from './entities/ticket.category.entity';
import { CreateTicketCategoryDto } from './dto/create-ticket.category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket.category.dto';

@Injectable()
export class TicketCategoryService {
  constructor(@InjectModel(TicketCategory.name) private ticketCategoryModel: Model<TicketCategory>) {}

  async create(createAgeCategoryDto: CreateTicketCategoryDto): Promise<TicketCategory> {
    try {
      const newCategory = new this.ticketCategoryModel(createAgeCategoryDto);
      return await newCategory.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create Ticket category');
    }
  }

  async findAll(): Promise<TicketCategory[]> {
    try {
      return await this.ticketCategoryModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve Ticket categories');
    }
  }

  async findOne(id: string): Promise<TicketCategory> {
    try {
      const ticketCategory = await this.ticketCategoryModel.findById(id).exec();
      if (!ticketCategory) {
        throw new NotFoundException(`Ticket category with ID ${id} not found`);
      }
      return ticketCategory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException for proper handling
      }
      throw new InternalServerErrorException('Failed to retrieve Ticket category');
    }
  }

  async update(id: string, updateAgeCategoryDto: UpdateTicketCategoryDto): Promise<TicketCategory> {
    try {
      const updatedCategory = await this.ticketCategoryModel.findByIdAndUpdate(id, updateAgeCategoryDto, { new: true }).exec();
      if (!updatedCategory) {
        throw new NotFoundException(`Ticket category with ID ${id} not found`);
      }
      return updatedCategory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException for proper handling
      }
      throw new InternalServerErrorException('Failed to update Ticket category');
    }
  }

  async remove(id: string): Promise<TicketCategory> {
    const deletedCategory = await this.ticketCategoryModel.findByIdAndDelete(id).exec();
    if (!deletedCategory) {
      throw new NotFoundException(`Ticket category with ID ${id} not found`);
    }
    return deletedCategory; 
  }
  
}
