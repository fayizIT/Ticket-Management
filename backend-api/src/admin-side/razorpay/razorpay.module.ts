import { Module } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { RazorpayController } from './razorpay.controller';

@Module({
  controllers: [RazorpayController],
  providers: [RazorpayService],
  exports: [RazorpayService], // Export the service
})
export class RazorpayModule {}
