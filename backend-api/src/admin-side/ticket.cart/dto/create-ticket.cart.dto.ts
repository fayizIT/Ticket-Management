// src/admin-side/ticket/dto/create-ticket.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  ageCategoryId: string; // Reference to Age Category

  @IsNotEmpty()
  @IsNumber()
  quantity: number; // Number of tickets of this age category

  @IsString()
  eventDate?: string;
}
