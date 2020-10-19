import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository, Like } from 'typeorm';
import { OneUserDTO } from './dto/one-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  async createUser(user: CreateUserDTO): Promise<OneUserDTO> {
    try {
      const newUser = await this.repo.save(user);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllUser(q: any): Promise<any> {
    const options = {
      take: q.limit || 10,
      skip: q.page - 1 || 0,
      role: q.group || 'user',
      search: q.q || ''
    }

    try {
      const [ results, total ] = await this.repo.findAndCount({
        where: {
          firstname: Like(`%${options.search}%`),
          lastname: Like(`%${options.search}%`),
          username: Like(`%${options.search}%`),
          email: Like(`%${options.search}%`),
          role: options.role,
        },
        order: {
          created_at: 'ASC'
        },
        take: options.take,
        skip: options.skip
      });

      return {
        results, total
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number): Promise<OneUserDTO> {
    try {
      const user = await this.repo.findOne(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(payload: UpdateUserDTO): Promise<any> {
    try {
      if (!await this.findById(payload.id)) {
        throw new Error('id not found');
      }
      const user = await this.repo.save({
        ...payload
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async destroy(id: number): Promise<any> {
    try {
      await this.repo.softDelete(id);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

}
