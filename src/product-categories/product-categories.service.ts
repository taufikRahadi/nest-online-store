import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../entity/ProductCategory';
import { Repository, Like } from 'typeorm';
import { CreateProductCategoryDTO } from './dto/create-product-categories.dto';
import { OneProductCategoryDTO } from './dto/one-product-category.dto';

@Injectable()
export class ProductCategoriesService {
  
  constructor(
    @InjectRepository(ProductCategory) private readonly productCategoryRepo: Repository<ProductCategory>
  ) {}

  async create(
    productCategory: CreateProductCategoryDTO
  ): Promise<OneProductCategoryDTO> {
    try {
      const newProductCategory = await this.productCategoryRepo.save(productCategory);
      return newProductCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(
    query
  ): Promise<any> {
    const take = query.limit || undefined;
    const skip = query.page - 1 || 0;
    const search = query.q || '';

    try {
      const [ results, total ] = await this.productCategoryRepo.findAndCount({
        order: {
          id: 'ASC'
        },
        take,
        skip,
        where: {
          title: Like(`%${search}%`)
        },
        loadRelationIds: true
      });

      return {
        results, total
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(
    id: number
  ): Promise<OneProductCategoryDTO> {
    try {
      const productCategory = await this.productCategoryRepo.findOne(id);
      return productCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: number,
    productCategory: CreateProductCategoryDTO
  ): Promise<any> {
    try {
      const updateProductCategory = await this.productCategoryRepo.update(id, productCategory);
      return updateProductCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async destroy(
    id: number
  ): Promise<any> {
    try {
      return await this.productCategoryRepo.softDelete(id);
    } catch (error) {
      throw new Error(error);  
    }
  }

}
