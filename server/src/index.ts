import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ProductResolver } from './resolvers/product';
import { UserResolver } from './resolvers/user';
import { conn } from './constants';

const PORT = 4000;

const main = async () => {
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
