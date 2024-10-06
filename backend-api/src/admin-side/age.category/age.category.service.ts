import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgeCategory } from './entities/age.category.entity';
import { CreateAgeCategoryDto } from './dto/create-age.category.dto';
import { UpdateAgeCategoryDto } from './dto/update-age.category.dto';

@Injectable()
export class AgeCategoryService {
  constructor(@InjectModel(AgeCategory.name) private ageCategoryModel: Model<AgeCategory>) {}

  async create(createAgeCategoryDto: CreateAgeCategoryDto): Promise<AgeCategory> {
    const newCategory = new this.ageCategoryModel(createAgeCategoryDto);
    return newCategory.save();
  }

  async findAll(): Promise<AgeCategory[]> {
    return this.ageCategoryModel.find().exec();
  }

  async findOne(id: string): Promise<AgeCategory> {
    return this.ageCategoryModel.findById(id).exec();
  }

  async update(id: string, updateAgeCategoryDto: UpdateAgeCategoryDto): Promise<AgeCategory> {
    return this.ageCategoryModel.findByIdAndUpdate(id, updateAgeCategoryDto, { new: true }).exec();
  }

async remove(id: string): Promise<AgeCategory> {
  return this.ageCategoryModel.findByIdAndDelete(id).exec();
}

}
