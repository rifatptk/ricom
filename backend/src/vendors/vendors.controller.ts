import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import {
  PaginationDto,
  PaginationQueryDto,
} from 'src/shared/dto/pagination.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private vendorsService: VendorsService) {}

  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    const { page, limit } = paginationQueryDto;

    const { data, total } = await this.vendorsService.findAll({
      skip: (page - 1) * limit,
      limit,
    });

    return {
      message: 'Vendors fetched successfully',
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vendorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.vendorsService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.vendorsService.delete(id);
  }
}
