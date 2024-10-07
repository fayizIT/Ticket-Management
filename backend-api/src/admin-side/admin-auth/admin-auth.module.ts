// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule
// import { AdminAuthController } from './admin-auth.controller';
// import { AdminAuthService } from './admin-auth.service';
// import { JwtStrategy } from './guards/jwt.strategy'; // Make sure the path is correct
// import { Admin, AdminSchema } from './admin.schema'; 

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
//     ConfigModule, // Ensure ConfigModule is imported here
//     JwtModule.registerAsync({
//       imports: [ConfigModule], // Keep this to ensure async registration works
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: '60s' }, // Consider changing expiration to a more appropriate duration
//       }),
//       inject: [ConfigService],
//     }),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//   ],
//   controllers: [AdminAuthController],
//   providers: [AdminAuthService, JwtStrategy],
// })
// export class AdminAuthModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { Admin, AdminSchema } from './admin.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }, // Consider a longer duration for token validity
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, JwtStrategy],
})
export class AdminAuthModule {}
