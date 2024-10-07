// src/modules/adminSide/admin-auth.controller.ts

import { Controller, Post, Body, UnauthorizedException, Get, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminDto, LoginDto } from './Dto/admin-auth.dto'; 
import { JwtAuthGuard } from './guards/jwt-auth.guard'; 

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('register')
  async register(@Body() createAdminDto: CreateAdminDto) {
    try {
      const { email, password } = createAdminDto; 
      return await this.adminAuthService.createAdmin(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      throw new InternalServerErrorException('Failed to register admin. Please try again later.');
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) { 
    try {
      const admin = await this.adminAuthService.validateAdmin(
        loginDto.email, 
        loginDto.password,
      );
      if (!admin) {
        console.error('Login attempt with invalid credentials for email:', loginDto.email);
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = await this.adminAuthService.login(admin);
      return { access_token: accessToken };
    } catch (error) {
      console.error('Login error:', error.message);
      console.error('Error stack:', error.stack);
      throw new InternalServerErrorException('Failed to login. Please try again later.');
    }
  }

  @UseGuards(JwtAuthGuard) // Protecting the dashboard endpoint with JWT guard
  @Get('dashboard') 
  async getDashboard() {
    try {
      return await this.adminAuthService.getDashboard();
    } catch (error) {
      console.error('Dashboard retrieval error:', error);
      throw new InternalServerErrorException('Failed to retrieve dashboard data. Please try again later.');
    }
  }

  @Post('logout')
  async logout(@Body() body: { token: string }) {
    try {
      return await this.adminAuthService.logout(body.token);
    } catch (error) {
      console.error('Logout error:', error);
      throw new InternalServerErrorException('Failed to logout. Please try again later.');
    }
  }
}
