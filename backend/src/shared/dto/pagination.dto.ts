import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { DEFAULT_PAGE_SIZE } from '../constants/pagination.constants';

export class PaginationQueryDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number = DEFAULT_PAGE_SIZE;
}

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  skip: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number = DEFAULT_PAGE_SIZE;
}
