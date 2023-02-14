import { ProductCategory, ProductSizes, ProductTags } from '../interfaces';

export const ProductMock = {
  id: '99499270-7778-42d9-88e0-833ad2387204',
  title: 'T-Shirt Teslo',
  price: 20,
  description: 'This T-Shirt is created by Teslo Company on 2021',
  slug: 't_shirt_teslo',
  stock: 100,
  sizes: [
    ProductSizes.XS,
    ProductSizes.S,
    ProductSizes.M,
    ProductSizes.L,
    ProductSizes.XL,
  ],
  category: ProductCategory.UNISEX,
  tags: [ProductTags.SHIRTS],
  images: ['1740226-00-A_0_2000.jpg', '1740226-00-A_1.jpg'],
};
