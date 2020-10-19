import { Injectable } from '@nestjs/common';
import { Product } from '../entity/Product';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductVariant } from '../entity/ProductVariant';
import { ProductTag } from '../entity/ProductTag';
import { ProductPicture } from '../entity/ProductPicture';
import * as firebase from 'firebase';
import { OneProductDTO } from './dto/one-product.dto';
import { throwError } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    @InjectRepository(ProductVariant) private readonly variants: Repository<ProductVariant>,
    @InjectRepository(ProductTag) private readonly productTags: Repository<ProductTag>,
    @InjectRepository(ProductPicture) private readonly productPictures: Repository<ProductPicture>
  ) {}

  async productPicture(payload) {
    try {
      const newPicture = await this.productPictures.save(payload);
      return newPicture;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async create(product: CreateProductDTO): Promise<any> {
    const { name, stock, price, weight, categoryId, description, tags, pictureUrl, variants } = product
    try {
      const newProduct = await this.repo.save({
        name,
        stock,
        price,
        weight,
        categoryId,
        description,
        product_tag: tags,
        variants,
      });

      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(query: any) {
    const take = query.take || undefined;
    const skip = query.page - 1 || 0;
    const search = query.q || '';
    const withDeleted = query.with_deleted || false;

    try {
      const products = await this.repo.find({
        where: {
          name: Like(`%${search}%`),
          code: Like(`%${search}%`)
        },
        order: {
          created_at: 'DESC'
        },
        take,
        skip,
        withDeleted,
      });
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number): Promise<OneProductDTO> {
    try {
      const product = await this.repo.findOne(id, {
        loadRelationIds: true
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, product: CreateProductDTO): Promise<any> {
    try {
      const updateProduct = await this.repo.update(id, product);
      return updateProduct;
    } catch (error) {
      throwError(error);
    }
  }

  async destroy(id: number): Promise<any> {
    try {
      await this.repo.softDelete(id);
      return true;
    } catch (error) {
      throwError(error);
    }
  }

}
