import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ProductResolver } from './resolvers/product';
import { DataSource } from 'typeorm';
import { Product } from './entities/product';
import { User } from './entities/user';
import { UserResolver } from './resolvers/user';

const PORT = 4000;

const main = async () => {
  const conn = new DataSource({
    type: 'postgres',
    database: 'shop-site',
    username: 'postgres',
    password: 'ntig123!',
    logging: true,
    synchronize: true,
    entities: [Product, User],
  });
  conn.initialize();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
      validate: false,
    }),
  });

  await apolloServer.start();

  const app = express();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
