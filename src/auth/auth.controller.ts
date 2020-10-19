import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayload } from './dto/login.dto';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { ValidatorService } from '../validator/validator.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly validate: ValidatorService
  ) {}

  @Post('login')
  async login(@Body() body: LoginPayload, @Res() res: Response): Promise<Response> {
    try {
      const { 
        error
       } = this.validate.loginValidation(body);
       if (error) return res.status(422).json({
         status: 'failed',
         message: error.details[0].message
       })

      const user = await this.service.login(body);
      const token = sign(user.id, 'TOKEN_SECRET');

      return res.json({
        status: 'ok',
        message: 'login success',
        data: {
          token
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: 'failed',
        message: error.message
      });
    }
  }
}
