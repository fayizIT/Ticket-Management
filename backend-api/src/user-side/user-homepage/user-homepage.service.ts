import { Injectable } from '@nestjs/common';
import { CreateUserHomepageDto } from './dto/create-user-homepage.dto';
import { UpdateUserHomepageDto } from './dto/update-user-homepage.dto';

@Injectable()
export class UserHomepageService {
  create(createUserHomepageDto: CreateUserHomepageDto) {
    return 'This action adds a new userHomepage';
  }

  findAll() {
    return `This action returns all userHomepage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userHomepage`;
  }

  update(id: number, updateUserHomepageDto: UpdateUserHomepageDto) {
    return `This action updates a #${id} userHomepage`;
  }

  remove(id: number) {
    return `This action removes a #${id} userHomepage`;
  }
}
