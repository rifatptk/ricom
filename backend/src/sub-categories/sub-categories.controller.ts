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
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination.dto';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoriesService.create(createSubCategoryDto);
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

    const { data, total } = await this.subCategoriesService.findAll({
      skip,
      limit: paginationQuery.limit,
    });

    return {
      message: 'Sub-categories fetched successfully',
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
    return this.subCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.subCategoriesService.remove(+id);
  }
}
