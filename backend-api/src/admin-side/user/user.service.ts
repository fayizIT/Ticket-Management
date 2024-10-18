// user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDetails: Partial<User>): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: userDetails.email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const user = new this.userModel(userDetails);
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}
