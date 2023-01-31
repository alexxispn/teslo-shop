import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/products.seed';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}
  async execute() {
    await this.resetProducts();
    return { message: 'Seed executed successfully' };
  }

  private async resetProducts() {
    await this.productsService.removeAllProducts();
    const products = initialData.products.map((product) =>
      this.productsService.create(product),
    );
    return Promise.all(products);
  }
}
