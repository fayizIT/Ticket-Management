// src/modules/adminSide/admin-auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.schema'; // Adjust this import based on your structure
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async createAdmin(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new this.adminModel({ email, password: hashedPassword, isAdmin: 1 });
    return newAdmin.save();
  }

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminModel.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    return null;
  }

  async login(admin: any) {
    const payload = { email: admin.email, sub: admin._id };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }

  async getDashboard(): Promise<any> {
    return {
      message: 'Admin Dashboard data from backend',
    };
  }

  private readonly blacklist: Set<string> = new Set(); // In-memory blacklist

  async logout(token: string): Promise<any> {
    this.blacklist.add(token);
    return { message: 'Logout successful' };
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklist.has(token);
  }

  async validateToken(token: string): Promise<void> {
    if (await this.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token is blacklisted or invalid');
    }
  }
}
