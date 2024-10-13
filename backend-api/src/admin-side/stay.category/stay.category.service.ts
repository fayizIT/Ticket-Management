import { Injectable, NotFoundException } from '@nestjs/common';
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
    const newCategory = new this.stayCategoryModel(createStayCategoryDto);
    return newCategory.save();
  }

  async findAll(): Promise<StayCategory[]> {
    return this.stayCategoryModel.find().exec();
  }

  async findOne(id: string): Promise<StayCategory> {
    const stayCategory = await this.stayCategoryModel.findById(id).exec();
    if (!stayCategory) {
      throw new NotFoundException(`Stay category with ID ${id} not found`);
    }
    return stayCategory;
  }

  async update(id: string, updateStayCategoryDto: UpdateStayCategoryDto): Promise<StayCategory> {
    const updatedCategory = await this.stayCategoryModel.findByIdAndUpdate(id, updateStayCategoryDto, {
      new: true,
    }).exec();
    if (!updatedCategory) {
      throw new NotFoundException(`Stay category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  async remove(id: string): Promise<void> {
    const result = await this.stayCategoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Stay category with ID ${id} not found`);
    }
  }
}
