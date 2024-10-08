import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuthModule } from './admin-side/admin-auth/admin-auth.module';
import { UserHomepageModule } from './user-side/user-homepage/user-homepage.module';
import { AgeCategoryModule } from './admin-side/age.category/age.category.module';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { TicketCartModule } from './admin-side/ticket.cart/ticket.cart.module';
import { BookingTicketModule } from './admin-side/booking.ticket/booking.ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Make the ConfigModule global so environment variables are accessible throughout
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ticket-booking'),
    AdminAuthModule,
    UserHomepageModule,
    AgeCategoryModule,
    TicketCartModule,
    BookingTicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
