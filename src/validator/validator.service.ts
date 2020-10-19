import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import * as Joi from '@hapi/joi';
import { LoginPayload } from '../auth/dto/login.dto';

@Injectable()
export class ValidatorService {
  createUserValidation(user: CreateUserDTO): any {
    const schema = Joi.object({
      firstname: Joi.string().min(3).required(),
      lastname: Joi.string().allow(null, ''),
      username: Joi.string().alphanum().min(6).required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      phonenumber: Joi.string().min(10).required(),
      role: Joi.string()
    });

    return schema.validate(user);
  }

  loginValidation(user: LoginPayload): any {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    });

    return schema.validate(user);
  }
}
