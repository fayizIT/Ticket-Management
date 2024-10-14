import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgeCategory } from './entities/age.category.entity';
import { CreateAgeCategoryDto } from './dto/create-age.category.dto';
import { UpdateAgeCategoryDto } from './dto/update-age.category.dto';

@Injectable()
export class AgeCategoryService {
  constructor(@InjectModel(AgeCategory.name) private ageCategoryModel: Model<AgeCategory>) {}

  async create(createAgeCategoryDto: CreateAgeCategoryDto): Promise<AgeCategory> {
    try {
      const newCategory = new this.ageCategoryModel(createAgeCategoryDto);
      return await newCategory.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create age category');
    }
  }

  async findAll(): Promise<AgeCategory[]> {
    try {
      return await this.ageCategoryModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve age categories');
    }
  }

  async findOne(id: string): Promise<AgeCategory> {
    try {
      const ageCategory = await this.ageCategoryModel.findById(id).exec();
      if (!ageCategory) {
        throw new NotFoundException(`Age category with ID ${id} not found`);
      }
      return ageCategory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException for proper handling
      }
      throw new InternalServerErrorException('Failed to retrieve age category');
    }
  }

  async update(id: string, updateAgeCategoryDto: UpdateAgeCategoryDto): Promise<AgeCategory> {
    try {
      const updatedCategory = await this.ageCategoryModel.findByIdAndUpdate(id, updateAgeCategoryDto, { new: true }).exec();
      if (!updatedCategory) {
        throw new NotFoundException(`Age category with ID ${id} not found`);
      }
      return updatedCategory;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException for proper handling
      }
      throw new InternalServerErrorException('Failed to update age category');
    }
  }

  async remove(id: string): Promise<AgeCategory> {
    const deletedCategory = await this.ageCategoryModel.findByIdAndDelete(id).exec();
    if (!deletedCategory) {
      throw new NotFoundException(`Age category with ID ${id} not found`);
    }
    return deletedCategory; 
  }
  
}
