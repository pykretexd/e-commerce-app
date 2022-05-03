import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ProductResolver } from './resolvers/product';
import { DataSource } from 'typeorm';
import { Product } from './entities/product';
import { User } from './entities/user';
import { UserResolver } from './resolvers/user';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import { resolve } from 'path';

const PORT = 4000;

const credentials = {
  key: readFileSync(resolve(__dirname, './sslcert/private.key'), 'utf8'),
  cert: readFileSync(resolve(__dirname, './sslcert/public.crt'), 'utf8'),
  passphrase: 'ntig123!',
};

const main = async () => {
  const conn = new DataSource({
    type: 'postgres',
    database: 'shop-site',
    username: 'postgres',
    password: 'ntig123!',
    logging: true,
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

  const httpsServer = createServer(credentials, app);

  httpsServer.listen(PORT, '192.168.1.2', () => {
    console.log(`Server running on ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
