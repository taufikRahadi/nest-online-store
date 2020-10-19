import { Controller, Get, Post, Body, Res, Query, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OneProductDTO } from './dto/one-product.dto';

@Controller('products')
export class ProductsController {
  
  constructor(
    private readonly service: ProductsService
  ) {}

  @Post('upload-picture')
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({
      destination: './img/products',
      filename: (req, file, cb) => {
        console.log(file)
        const random = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${random}${extname(file.originalname)}`);
      }
    })
  }))
  async upload(@Body() body, @Res() res: Response, @UploadedFile() file): Promise<Response> {
    const { title, link, productId } = body;
    try {
      const pictureUrl = file.filename;
      const uploadedPicture = await this.service.productPicture({
        title,
        pictureUrl,
        link,
        productId
      });
      return res.json({
        status: 'ok',
        message: 'success',
        uploadedPicture
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: error.message
      });
    }
  }

  @Post()
  async create(@Body() body: CreateProductDTO, @Res() res: Response): Promise<Response> {
    try {
      const newProduct = await this.service.create(body);
      return res.status(201).json({
        status: 'ok',
        message: 'success',
        data: newProduct
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
  async findAll(@Query() q: object, @Res() res: Response): Promise<Response> {
    try {
      const products = await this.service.findAll(q);
      return res.json({
        products
      });
    } catch (error) {
      console.log(error);
      return res.send(error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      const product: OneProductDTO = await this.service.findById(id);
      return res.json({
        status: 'ok',
        message: 'success',
        data: product
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
  async update(@Param('id') id: number, @Body() body: CreateProductDTO, @Res() res: Response): Promise<Response> {
    try {
      const product = await this.service.update(id, body);
      return res.json({
        status: 'ok',
        message: 'updated',
        data: product
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
      await this.service.destroy(id);
      return res.json({
        status: 'ok',
        message: 'deleted',
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
