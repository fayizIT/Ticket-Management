import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminAuthService } from '../admin-auth.service'; 
import { Admin } from '../admin.schema'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminAuthService: AdminAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretkey', // Make sure to use the same secret used in JwtModule
    });
  }

  async validate(payload: any): Promise<Admin> {
    const admin = await this.adminAuthService.validateAdmin(payload.email, payload.sub);
    return admin; // Return the admin object for further use in your application
  }
}