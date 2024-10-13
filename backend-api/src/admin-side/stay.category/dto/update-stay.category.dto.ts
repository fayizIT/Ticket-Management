// import { PartialType } from '@nestjs/mapped-types';
// import { CreateStayCategoryDto } from './create-stay.category.dto';

// export class UpdateStayCategoryDto extends PartialType(CreateStayCategoryDto) {}


import { PartialType } from '@nestjs/mapped-types';
import { CreateStayCategoryDto } from './create-stay.category.dto';

export class UpdateStayCategoryDto extends PartialType(CreateStayCategoryDto) {}
