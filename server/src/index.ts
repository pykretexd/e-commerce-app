import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ProductResolver } from './resolvers/product';
import { UserResolver } from './resolvers/user';
import { conn, __prod__ } from './constants';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import expressSession from 'express-session';

const PORT = 4000;

const main = async () => {
  conn.initialize();

  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = new Redis('127.0.0.1:6379');

  app.use(
    expressSession({
      name: 'qid',
      store: new RedisStore({ client: redisClient as any, disableTouch: true }),
      saveUninitialized: false,
      resave: false,
      secret: 'ntig123!',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // max age: 10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
