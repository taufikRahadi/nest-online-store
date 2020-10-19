import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.user.role !== 'admin') return res.status(401).json({
      status: 'failed',
      message: 'you are not authorized to make this request'
    });
    return next();
  }
}
