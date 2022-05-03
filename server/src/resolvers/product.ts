import { Product } from '../entities/product';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find();
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
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Arg('price', () => Int, { nullable: true }) price: number,
    @Arg('count', () => Int, { nullable: true }) count: number
  ): Promise<Product | null> {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Product.update({ id }, { title, price, count });
    }

    return product;
  }

  @Mutation(() => Product, { nullable: true })
  async deleteProduct(@Arg('id') id: number): Promise<boolean> {
    await Product.delete(id);
    return true;
  }
}
