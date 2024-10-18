
// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema
  ],
  providers: [UserService],
  exports: [UserService, MongooseModule], // Export UserService and MongooseModule for use in other modules
})
export class UserModule {}
