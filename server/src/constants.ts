import { DataSource } from 'typeorm';
import { Product } from './entities/product';
import { User } from './entities/user';

export const COOKIE_NAME = 'qid';

export const conn = new DataSource({
  type: 'postgres',
  database: 'shop-site',
  username: 'postgres',
  password: process.env.DB_SECRET,
  logging: true,
  synchronize: true,
  entities: [Product, User],
});
