import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TicketCategoryService } from './ticket.category.service'; 
import { CreateTicketCategoryDto } from './dto/create-ticket.category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket.category.dto';
import { TicketCategory } from './entities/ticket.category.entity';

@Controller('admin/ticket-Category')
export class TicketCategoryController {
  constructor(private readonly ticketCategoryService: TicketCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTicketCategoryDto: CreateTicketCategoryDto): Promise<TicketCategory> {
    try {
      return await this.ticketCategoryService.create(createTicketCategoryDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to create Ticket Category', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<TicketCategory[]> {
    return this.ticketCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TicketCategory> {
    try {
      return await this.ticketCategoryService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Ticket Category not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateticketCategoryDto: UpdateTicketCategoryDto,
  ): Promise<TicketCategory> {
    try {
      return await this.ticketCategoryService.update(id, updateticketCategoryDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to update Ticket Category', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TicketCategory> {
    try {
      return await this.ticketCategoryService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to delete Ticket Category', HttpStatus.BAD_REQUEST);
    }
  }
}
