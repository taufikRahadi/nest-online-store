import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { UserAddress } from '../entity/UserAddress';
import { ValidatorService } from '../validator/validator.service';
import { AuthenticationMiddleware } from '../middleware/authentication.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAddress
    ])
  ],
  controllers: [UserController],
  providers: [UserService, ValidatorService],
  exports: [UserService]
})
export class UserModule {

}
