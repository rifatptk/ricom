import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/shared/constants/pagination.constants';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const [data, total] = await Promise.all([
      this.categoriesRepository.find({
        skip: paginationDto.skip,
        take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
      }),
      this.categoriesRepository.count(),
    ]);

    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return this.categoriesRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException();
    }

    return this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    const deletedResult = await this.categoriesRepository.delete(id);

    if (deletedResult.affected === 0) {
      throw new NotFoundException();
    }
  }
}
