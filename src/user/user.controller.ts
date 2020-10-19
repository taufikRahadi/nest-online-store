import { Controller, Post, Body, Res, Query, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Response } from 'express';
import { ValidatorService } from '../validator/validator.service';
import { hashSync } from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '../helper/auth.guard';

@Controller('users')
export class UserController {

  constructor(
    private readonly service: UserService,
    private readonly validator: ValidatorService
  ) {}

  @Post()
  async create(@Body() body: CreateUserDTO, @Res() res: Response): Promise<Response> {
    try {
      const {
        error
      } = this.validator.createUserValidation(body);
      if (error) return res.status(422).json({ status: 'failed', message: error.details[0].message });

      body['password'] = hashSync(body.password, 10);
      const newUser = await this.service.createUser(body);
      return res.json({
        status: 'ok',
        message: 'created',
        data: newUser
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: error.message
      });
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllUser(@Query() q, @Res() res: Response): Promise<Response> {
    try {
      const users = await this.service.findAllUser(q);
      return res.status(200).json({
        status: 'ok',
        message: 'success',
        data: users
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: error.message
      });
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      const user = await this.service.findById(id);
      return res.json({
        status: 'ok',
        message: 'user by id',
        data: user
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: error.message
      });
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDTO, @Res() res:Response): Promise<Response> {
    if (body.password !== undefined) {
      body.password = hashSync(body.password, 10);
    }

    try {
      const updateUser = await this.service.update(body);
      return res.status(200).json({
        status: 'ok',
        message: 'updated',
        data: updateUser
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: error.message
      });
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id:number, @Res() res: Response): Promise<Response> {
    try {
      await this.service.destroy(id);
      return res.json({
        status: 'ok',
        message: 'deleted'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: error.message
      });
    }
  }

}
