// src/modules/adminSide/guards/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminAuthService } from '../admin-auth.service'; 
import { Admin } from '../admin.schema'; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'abc123', // Use ConfigService to get secret
    });
  }

  async validate(payload: any): Promise<Admin> {
    // Use only the sub (ID) to find the admin
    const admin = await this.adminAuthService.validateAdminById(payload.sub);
    if (!admin) {
      throw new UnauthorizedException('Invalid token');
    }
    return admin; 
  }
}
