import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuthModule } from './admin-side/admin-auth/admin-auth.module';
import { TicketCategoryModule } from './admin-side/ticket.category/ticket.category.module'; 
import { ConfigModule } from '@nestjs/config'; 
import { BookingModule } from './admin-side/booking.ticket/booking.ticket.module'; 
import { StayCategoryModule } from './admin-side/stay.category/stay.category.module';
import { CouponModule } from './admin-side/coupon/coupon.module';
import { UserModule } from './admin-side/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ticket-booking'),
    AdminAuthModule,
    TicketCategoryModule,
    BookingModule,
    StayCategoryModule,
    CouponModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
