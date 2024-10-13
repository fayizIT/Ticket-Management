import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStayCategoryDto: UpdateStayCategoryDto) {
    return this.stayCategoryService.update(id, updateStayCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
      try {
          await this.stayCategoryService.remove(id);
          return { message: `Stay category with ID ${id} successfully deleted` }; // Return success message
      } catch (error) {
          // If a NotFoundException is thrown, it will be handled by NestJS automatically and return a 404 status
          // If other errors occur, you can customize the error response here
          throw new HttpException('Unable to delete stay category', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  
}
