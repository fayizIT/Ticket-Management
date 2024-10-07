// src/modules/adminSide/admin-auth.service.ts

import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async createAdmin(email: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new this.adminModel({ email, password: hashedPassword, isAdmin: 1 });
      return await newAdmin.save();
    } catch (error) {
      console.error('Error creating admin:', error);
      throw new InternalServerErrorException('Failed to create admin. Please try again later.');
    }
  }

  async validateAdmin(email: string, password: string): Promise<Admin | null> {
    console.log('Validating admin with email:', email);
    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
      console.error('Admin not found:', email);
      return null; // Return null if not found
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log('Password validation result:', isPasswordValid);
    return isPasswordValid ? admin : null; // Return null if password does not match
  }

  async validateAdminById(adminId: string): Promise<Admin | null> {
    const admin = await this.adminModel.findById(adminId);
    return admin; 
  }

  async login(admin: any) {
    try {
      const payload = { email: admin.email, sub: admin._id };
      return {
        message: 'Login successful',
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Login failed:', error.message); // Log the error message
      console.error('Error stack:', error.stack); // Log the error stack
      throw new InternalServerErrorException('Failed to login. Please try again later.');
    }
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
