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
import cors from 'cors';

const PORT = 4000;

const main = async () => {
  conn.initialize();

  const RedisStore = connectRedis(session);
  const redis = new Redis('127.0.0.1:6379');

  const app = express();
  app.set('trust proxy', !__prod__);
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:4000/graphql',
        'https://studio.apollographql.com',
      ],
      credentials: true,
    })
  );
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: 'ntig123!',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.log('server started on localhost:', PORT);
  });
};

main().catch((err) => {
  console.error(err);
});
