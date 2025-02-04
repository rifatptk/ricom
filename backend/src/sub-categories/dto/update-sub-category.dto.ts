import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCategoryDto } from './create-sub-category.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
