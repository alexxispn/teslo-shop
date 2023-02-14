import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../interfaces';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product Title',
    uniqueItems: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Product Price',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product Description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product Slug',
    uniqueItems: true,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product Stock',
    nullable: true,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Product Sizes',
    nullable: false,
  })
  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @ApiProperty({
    description: 'Product Category',
    nullable: false,
  })
  @IsIn([
    ProductCategory.KIDS,
    ProductCategory.MEN,
    ProductCategory.WOMEN,
    ProductCategory.UNISEX,
  ])
  category: string;
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
