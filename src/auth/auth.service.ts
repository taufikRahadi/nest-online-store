import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { LoginPayload } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  async login(payload: LoginPayload): Promise<any> {
    try {
      const user = await this.repo.findOne({
        where: {
          username: payload.username,
        },
        select: ['id', 'username', 'password']
      });
      if (!user) throw new Error('username not found');
      const compare = compareSync(payload.password, user.password);
      if (!compare) throw new Error('wrong password');

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
