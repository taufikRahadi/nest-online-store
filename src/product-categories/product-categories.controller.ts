import { Controller, Body, Get, Query, Res, Post, Param, Put, Delete } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { Response } from 'express';
import { CreateProductCategoryDTO } from './dto/create-product-categories.dto';

@Controller('product-categories')
export class ProductCategoriesController {
  
  constructor(
    private readonly productCategoryService: ProductCategoriesService
  ) {}

  @Post()
  async create(@Body() body: CreateProductCategoryDTO, @Res() res: Response): Promise<Response> {
    try {
      const productCategory = await this.productCategoryService.create(body);
      return res.status(201).json({
        status: 'ok',
        message: 'created',
        productCategory
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'ok',
        message: error.message,
      });
    }
  }

  @Get()
  async findAll(@Query() q: object, @Res() res: Response): Promise<Response> {
    try {
      const productCategories = await this.productCategoryService.findAll(q);
      return res.status(200).json({
        status: 'ok',
        message: 'success',
        data: productCategories
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'ok',
        message: error.message,
      });
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      const productCategory = await this.productCategoryService.findById(id);
      return res.status(200).json({
        status: 'ok',
        message: 'success',
        data: productCategory
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
  async update(@Param('id') id: number, @Body() productCategory: CreateProductCategoryDTO, @Res() res: Response): Promise<Response> {
    try {
      await this.productCategoryService.update(id, productCategory);
      return res.status(200).json({
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
      await this.productCategoryService.destroy(id);
      return res.status(200).json({
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
