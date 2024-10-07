// src/modules/adminSide/Dto/admin-auth.dto.ts

import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
