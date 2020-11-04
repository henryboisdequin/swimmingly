import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, SESSION_SECRET, __prod__ } from "./constants";
import { User } from "./entities/User";
import { Workout } from "./entities/Workout";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { WorkoutResolver } from "./resolvers/workout";

const main = async (PORT: number) => {
  // create connection to postgres db
  const conn = await createConnection({
    type: "postgres",
    database: process.env.DATABASE_NAME as string,
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Workout],
  });

  // run the migrations
  await conn.runMigrations();

  // init
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  // set app settings
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    })
  );

  // create the apollo server
  const apolloServer = new ApolloServer({
    // build the schemas
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, WorkoutResolver],
      validate: false,
    }),
    // create context
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  // apply the middleware
  apolloServer.applyMiddleware({ app });

  // listen on port provided
  app.listen(PORT, () => {
    console.log(`🚀 Server is starting on localhost:${PORT}`);
  });
};

main(4000).catch((err) => console.error(err));
