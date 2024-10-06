

import { Controller, Post, Body, UnauthorizedException, Get } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body; // Change username to email
    return this.adminAuthService.createAdmin(email, password);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) { // Change username to email
    const admin = await this.adminAuthService.validateAdmin(
      loginDto.email, // Change username to email
      loginDto.password,
    );
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.adminAuthService.login(admin);
    return { access_token: accessToken };
  }


  @Get('dashboard') // Add endpoint to get dashboard data
  async getDashboard() {
    return this.adminAuthService.getDashboard();
  }

  @Post('logout')
  async logout(@Body() body: { token: string }) {
    return this.adminAuthService.logout(body.token);
  }
}

