import { Controller, Post, Body, Res, Get, Query, Param, Put, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { Response } from 'express';
import { CreateUpdateTagDTO } from './dto/create-update-tag.dto';

@Controller('tags')
export class TagController {
  
  constructor(
    private readonly tagService: TagService
  ) {}

  @Post()
  async create(@Body() tag: CreateUpdateTagDTO, @Res() res: Response): Promise<Response> {
    try {
      const newTag = await this.tagService.create(tag);
      return res.json({
        status: 'ok',
        message: 'created',
        data: newTag
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: error.message
      })
    }
  }

  @Get()
  async findAll(@Query() q: any, @Res() res: Response): Promise<Response> {
    try {
      const tags = await this.tagService.findAll(q);
      return res.json({
        status: 'ok',
        message: 'success',
        data: tags
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
      const tag = await this.tagService.findById(id);
      return res.json({
        status: 'ok',
        message: 'succes',
        data: tag
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
  async update(@Param('id') id: number, @Body() tag: CreateUpdateTagDTO, @Res() res: Response): Promise<Response> {
    try {
      await this.tagService.update(id, tag);
      return res.json({
        status: 'ok',
        message: 'updated'
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
  async destroy(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      await this.tagService.destroy(id);
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
