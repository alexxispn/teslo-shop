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
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productsRepository.create(createProductDto);
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.productsRepository.find({
      skip: offset,
      take: limit,
    });
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
        .getOne();
    }
    if (product) return product;
    throw new NotFoundException(`Product with term ${term} not found`);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    const updatedProduct = Object.assign(product, updateProductDto);
    try {
      await this.productsRepository.save(updatedProduct);
      return updatedProduct;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return { deleted: product };
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
