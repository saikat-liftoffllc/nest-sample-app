import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers;

    if (authorization === 'Bearer token') {
      return next();
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
  }
}
