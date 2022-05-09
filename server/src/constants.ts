import { DataSource } from 'typeorm';
import { Product } from './entities/product';
import { User } from './entities/user';

export const __prod__ = process.env.NODE_ENV === 'production';
export const conn = new DataSource({
  type: 'postgres',
  database: 'shop-site',
  username: 'postgres',
  password: 'ntig123!',
  logging: true,
  synchronize: true,
  entities: [Product, User],
});
