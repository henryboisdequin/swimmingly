import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, db, SESSION_SECRET, __prod__ } from "./constants";
import { User } from "./entities/User";
import { Workout } from "./entities/Workout";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { WorkoutResolver } from "./resolvers/workout";
import { createUserLoader } from "./utils/createUserLoader";

const main = async (PORT: number) => {
  // create connection to postgres db
  const conn = await createConnection({
    type: "postgres",
    database: db,
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Workout],
  });

  // run the migrations
  // await conn.runMigrations();

  // delete if wanted
  // await Workout.delete({});

  // init
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  // set app settings
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

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
      userLoader: createUserLoader(),
    }),
  });

  // apply the middleware
  apolloServer.applyMiddleware({ app, cors: false });

  // listen on port provided
  app.listen(PORT, () => {
    console.log(`🚀 Server is starting on localhost:${PORT}`);
  });
};

main(4000).catch((err) => console.error(err));
