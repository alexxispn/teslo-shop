import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset: number;
}
