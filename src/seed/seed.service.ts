import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data.seed';
import { ValidRoles } from '../auth/interfaces';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute() {
    await this.deleteProducts();
    const users = await this.resetUsers();
    const admin = users.find((user) => user.roles.includes(ValidRoles.ADMIN));
    await this.resetProducts(admin);
    return 'Seed executed';
  }
  private async deleteProducts() {
    await this.productsService.removeAllProducts();
    await this.userRepository.delete({});
  }
  private async resetUsers() {
    await this.userRepository.delete({});
    return await Promise.all(
      initialData.users.map((user) => this.userRepository.save(user)),
    );
  }
  private async resetProducts(user: User) {
    await this.productsService.removeAllProducts();
    return await Promise.all(
      initialData.products.map((product) =>
        this.productsService.create(product, user),
      ),
    );
  }
}
