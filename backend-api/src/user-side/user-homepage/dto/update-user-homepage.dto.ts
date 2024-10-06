import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHomepageDto } from './create-user-homepage.dto';

export class UpdateUserHomepageDto extends PartialType(CreateUserHomepageDto) {}
