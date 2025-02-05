import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  PaginationDto,
  PaginationQueryDto,
} from 'src/shared/dto/pagination.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

    const { data, total } = await this.categoriesService.findAll({
      skip,
      limit: paginationQuery.limit,
    });

    return {
      message: 'Categories fetched successfully',
      data,
      meta: {
        total,
        page: paginationQuery.page,
        last_page: Math.ceil(total / paginationQuery.limit),
      },
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
