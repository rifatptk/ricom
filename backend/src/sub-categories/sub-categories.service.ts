import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { Repository } from 'typeorm';
import { DEFAULT_PAGE_SIZE } from 'src/shared/constants/pagination.constants';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subcategoryRepository: Repository<SubCategory>,
  ) {}
  create(createSubCategoryDto: CreateSubCategoryDto) {
    return this.subcategoryRepository.save(createSubCategoryDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const [data, total] = await Promise.all([
      this.subcategoryRepository.find({
        skip: paginationDto.skip,
        take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
        relations: ['category'],
      }),
      this.subcategoryRepository.count(),
    ]);

    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return this.subcategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(id: number, updateSubcategoryDto: UpdateSubCategoryDto) {
    const category = await this.subcategoryRepository.preload({
      id,
      ...updateSubcategoryDto,
    });

    if (!category) {
      throw new NotFoundException();
    }

    return this.subcategoryRepository.save(category);
  }

  async remove(id: number) {
    const deletedResult = await this.subcategoryRepository.delete(id);

    if (deletedResult.affected === 0) {
      throw new NotFoundException();
    }
  }
}
