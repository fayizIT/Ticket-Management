import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserHomepageService } from './user-homepage.service';
import { CreateUserHomepageDto } from './dto/create-user-homepage.dto';
import { UpdateUserHomepageDto } from './dto/update-user-homepage.dto';

@Controller('user-homepage')
export class UserHomepageController {
  constructor(private readonly userHomepageService: UserHomepageService) {}

  @Post()
  create(@Body() createUserHomepageDto: CreateUserHomepageDto) {
    return this.userHomepageService.create(createUserHomepageDto);
  }

  @Get()
  findAll() {
    return this.userHomepageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userHomepageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserHomepageDto: UpdateUserHomepageDto) {
    return this.userHomepageService.update(+id, updateUserHomepageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userHomepageService.remove(+id);
  }
}
