import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StayCategoryService } from './stay.category.service';
import { CreateStayCategoryDto } from './dto/create-stay.category.dto';
import { UpdateStayCategoryDto } from './dto/update-stay.category.dto';

@Controller('admin/stay-categories')
export class StayCategoryController {
  constructor(private readonly stayCategoryService: StayCategoryService) {}

  @Post()
  create(@Body() createStayCategoryDto: CreateStayCategoryDto) {
    return this.stayCategoryService.create(createStayCategoryDto);
  }

  @Get()
  findAll() {
    return this.stayCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stayCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStayCategoryDto: UpdateStayCategoryDto) {
    return this.stayCategoryService.update(id, updateStayCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stayCategoryService.remove(id);
  }
}
