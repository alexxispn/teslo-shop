import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductMock } from '../mocks/product.mock';

@Entity()
export class Product {
  @ApiProperty({
    example: ProductMock.id,
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: ProductMock.title,
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: ProductMock.price,
    description: 'Product Price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: ProductMock.description,
    description: 'Product Description',
    default: null,
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: ProductMock.slug,
    description: 'Product Slug',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: ProductMock.stock,
    description: 'Product Stock',
    default: 0,
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ProductMock.sizes,
    description: 'Product Sizes',
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: ProductMock.category,
    description: 'Product Category',
    uniqueItems: true,
  })
  @Column('text')
  category: string;

  @ApiProperty({
    example: ProductMock.tags,
    description: 'Product Tags',
    uniqueItems: true,
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    example: ProductMock.images,
    description: 'Product Images',
    uniqueItems: true,
  })
  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @BeforeInsert()
  slugifyOnInsert() {
    if (!this.slug) this.slug = this.title;
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  slugifyOnUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
