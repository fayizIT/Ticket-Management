import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStayCategoryDto } from './dto/create-stay.category.dto';
import { UpdateStayCategoryDto } from './dto/update-stay.category.dto';
import { StayCategory, StayCategoryDocument } from './entities/stay.category.entity';

@Injectable()
export class StayCategoryService {
  constructor(
    @InjectModel(StayCategory.name) private stayCategoryModel: Model<StayCategoryDocument>,
  ) {}

  async create(createStayCategoryDto: CreateStayCategoryDto): Promise<StayCategory> {
    try {
      const newCategory = new this.stayCategoryModel(createStayCategoryDto);
      return await newCategory.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create stay category');
    }
  }

  async findAll(): Promise<StayCategory[]> {
    try {
      return await this.stayCategoryModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve stay categories');
    }
  }

  async findOne(id: string): Promise<StayCategory> {
    try {
      const stayCategory = await this.stayCategoryModel.findById(id).exec();
      if (!stayCategory) {
        throw new NotFoundException(`Stay category with ID ${id} not found`);
      }
      return stayCategory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException for proper handling
      }
      throw new InternalServerErrorException('Failed to retrieve stay category');
    }
  }

  async update(id: string, updateStayCategoryDto: UpdateStayCategoryDto): Promise<StayCategory> {
    try {
      const updatedCategory = await this.stayCategoryModel.findByIdAndUpdate(id, updateStayCategoryDto, {
        new: true,
      }).exec();
      if (!updatedCategory) {
        throw new NotFoundException(`Stay category with ID ${id} not found`);
      }
      return updatedCategory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException for proper handling
      }
      throw new InternalServerErrorException('Failed to update stay category');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.stayCategoryModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Stay category with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete stay category');
    }
  }
}
