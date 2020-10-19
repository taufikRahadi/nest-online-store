import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entity/Tag';
import { Repository, Like, IsNull } from 'typeorm';
import { OneTagDTO } from './dto/one-tag.dto';
import { CreateUpdateTagDTO } from './dto/create-update-tag.dto';

@Injectable()
export class TagService {
  
  constructor(
    @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>
  ) {}

  async create(tag: CreateUpdateTagDTO): Promise<OneTagDTO> {
    try {
      const newTag = await this.tagRepo.save(tag);
      return newTag;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(query: any): Promise<any> {
    const take = query.limit || undefined;
    const skip = query.page || 0;
    const search = query.s || '';

    try {
      const [ results, total ] = await this.tagRepo.findAndCount({
        order: {
          id: 'ASC'
        },
        where: {
          title: Like(`%${search}%`),
        },
        take,
        skip
      });
      return {
        results, total
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number): Promise<OneTagDTO> {
    try {
      const tag = await this.tagRepo.findOne({
        where: {
          id: id,
          deleted_at: null
        },
        loadRelationIds: true
      });
      return tag;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, tag: CreateUpdateTagDTO): Promise<any> {
    try {
      console.log(tag);
      const updateTag = await this.tagRepo.update(id, tag);
      return updateTag;
    } catch (error) {
      throw new Error(error);
    }
  }

  async destroy(id: number): Promise<any> {
    try {
      await this.tagRepo.softDelete(id);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

}
