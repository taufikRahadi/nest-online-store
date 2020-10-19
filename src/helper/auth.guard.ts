import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, decode } from 'jsonwebtoken';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate
{
  
  constructor(private readonly userService: UserService)
  {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>
  {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new Error('you are not authenticated to make this request');
    }
    const token = request.headers.authorization.split(' ')[1];
    const verified = verify(token, 'TOKEN_SECRET');
    if (!verified) return false;

    const decoded = decode(token, 'TOKEN_SECRET');
    const user = await this.userService.findById(decoded);
    if (!user) return false;

    console.log(user);
    return true;
  }
}
