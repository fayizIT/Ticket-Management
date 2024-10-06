// src/middlewares/auth.middleware.ts

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AdminAuthService } from '../admin-side/admin-auth/admin-auth.service'; 

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
    if (token) {
      try {
        await this.adminAuthService.validateToken(token); // Call the method to validate the token
        next();
      } catch (err) {
        throw new UnauthorizedException(err.message);
      }
    } else {
      throw new UnauthorizedException('No token provided');
    }
  }
}
