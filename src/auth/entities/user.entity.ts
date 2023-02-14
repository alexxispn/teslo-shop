import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'User ID',
    nullable: false,
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User Email',
    nullable: false,
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({
    description: 'User Password',
    nullable: false,
  })
  @Column('text', { select: false })
  password: string;

  @ApiProperty({
    description: 'User Full Name',
    nullable: false,
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    description: 'User is Active',
    default: true,
    nullable: false,
  })
  @Column('bool', { default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'User Roles',
    default: ['user'],
    nullable: false,
  })
  @Column('text', { array: true, default: '{user}' })
  roles: string[];

  @ApiProperty({
    description: 'User Products',
    nullable: true,
  })
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  emailToLowerCaseUpdate() {
    this.emailToLowerCase();
  }
}
