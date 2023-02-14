import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Product, ProductImage } from './entities';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const { images = [], ...productData } = createProductDto;
      const product = this.productsRepository.create({
        ...productData,
        images: images.map((url) =>
          this.productImagesRepository.create({ url }),
        ),
        user,
      });
      await this.productsRepository.save(product);
      return { ...product, images };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const products = await this.productsRepository.find({
      skip: offset,
      take: limit,
      relations: ['images'],
    });
    return products.map(({ images, ...productData }) => ({
      ...productData,
      images: images.map(({ url }) => url),
    }));
  }

  async findOne(term: string) {
    let product: Product;
    if (this.isUUID(term)) {
      product = await this.productsRepository.findOneBy({ id: term });
    } else {
      const queryBuilder =
        this.productsRepository.createQueryBuilder('product');
      product = await queryBuilder
        .where('LOWER(product.title) = :title or product.slug = :slug', {
          title: term.toLowerCase(),
          slug: term,
        })
        .leftJoinAndSelect('product.images', 'images')
        .getOne();
    }
    if (product) return product;
    throw new NotFoundException(`Product with term ${term} not found`);
  }

  async findOnePlain(term: string) {
    const { images = [], ...productData } = await this.findOne(term);
    return {
      ...productData,
      images: images.map(({ url }) => url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const { images, ...productData } = updateProductDto;
    const product = await this.productsRepository.preload({
      id,
      ...productData,
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });
        product.images = images.map((url) =>
          this.productImagesRepository.create({ url }),
        );
      }
      product.user = user;
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return { deleted: product };
  }

  async removeAllProducts() {
    const query = this.productsRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new ConflictException(
        'Product already exists. Check title or slug',
      );
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Error creating product');
  }

  private isUUID(term: string) {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(term);
  }
}
