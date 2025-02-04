import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
