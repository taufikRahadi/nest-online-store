import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/Product';
import { ProductTag } from '../entity/ProductTag';
import { ProductVariant } from '../entity/ProductVariant';
import { ProductPicture } from '../entity/ProductPicture';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductTag,
      ProductVariant,
      ProductPicture
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
