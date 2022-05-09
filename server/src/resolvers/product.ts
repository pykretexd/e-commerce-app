import { Product } from '../entities/product';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { MoreThan } from 'typeorm';
import { conn } from '../constants';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find();
  }

  @Query(() => [Product])
  availableProducts(): Promise<Product[]> {
    return Product.findBy({ count: MoreThan(0) });
  }

  @Query(() => [Product], { nullable: true })
  product(@Arg('id') id: number): Promise<Product | null> {
    return Product.findOne({ where: { id } });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('title') title: string,
    @Arg('price') price: number,
    @Arg('count') count: number
  ): Promise<Product> {
    return Product.create({ title, price, count }).save();
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg('id', () => Int) id: number,
    @Arg('title') title: string,
    @Arg('price') price: number,
    @Arg('count') count: number
  ): Promise<Product | null> {
    const result = await conn
      .createQueryBuilder()
      .update(Product)
      .set({ title, price, count })
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Product, { nullable: true })
  async deleteProduct(@Arg('id') id: number): Promise<boolean> {
    await Product.delete(id);
    return true;
  }
}
