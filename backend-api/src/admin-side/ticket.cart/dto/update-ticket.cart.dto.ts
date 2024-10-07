// src/admin-side/ticket/dto/update-ticket.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateTicketDto {
  @IsNotEmpty()
  @IsString()
  ageCategoryId: string; // Reference to Age Category

  @IsNotEmpty()
  @IsNumber()
  quantity: number; // Number of tickets of this age category
}
