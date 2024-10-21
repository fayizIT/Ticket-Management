import { Body, Controller, Post } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { CreateRazorpayOrderDto } from './dto/create-razorpay.dto';

@Controller('razorpay')
export class RazorpayController {
    constructor(private readonly razorpayService: RazorpayService) {}

    @Post('create-order')
    async createOrder(@Body() createRazorpayOrderDto: CreateRazorpayOrderDto) {
        const order = await this.razorpayService.createOrder(createRazorpayOrderDto.amount, createRazorpayOrderDto.currency);
        return {
            id: order.id,
            amount: order.amount / 100, 
            currency: order.currency,
            receipt: order.receipt,
        };
    }
    
}
