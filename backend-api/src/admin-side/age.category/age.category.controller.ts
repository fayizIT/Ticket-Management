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
import { AgeCategoryService } from './age.category.service';
import { CreateAgeCategoryDto } from './dto/create-age.category.dto';
import { UpdateAgeCategoryDto } from './dto/update-age.category.dto';
import { AgeCategory } from './entities/age.category.entity';

@Controller('admin/ticket-Category')
export class AgeCategoryController {
  constructor(private readonly ageCategoryService: AgeCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createAgeCategoryDto: CreateAgeCategoryDto): Promise<AgeCategory> {
    try {
      return await this.ageCategoryService.create(createAgeCategoryDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to create Age Category', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<AgeCategory[]> {
    return this.ageCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AgeCategory> {
    try {
      return await this.ageCategoryService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Age Category not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateAgeCategoryDto: UpdateAgeCategoryDto,
  ): Promise<AgeCategory> {
    try {
      return await this.ageCategoryService.update(id, updateAgeCategoryDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to update Age Category', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<AgeCategory> {
    try {
      return await this.ageCategoryService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to delete Age Category', HttpStatus.BAD_REQUEST);
    }
  }
}
