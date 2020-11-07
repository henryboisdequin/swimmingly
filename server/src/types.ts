import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./entities/User";
import { Workout } from "./entities/Workout";
import { createUserLoader } from "./utils/createUserLoader";

@ObjectType()
export class PaginatedWorkouts {
  @Field(() => [Workout])
  workouts: Workout[];

  @Field()
  hasMore: boolean;
}

@InputType()
export class WorkoutInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  distance: string;

  @Field()
  private: boolean;

  @Field()
  notes: string;
}

@InputType()
export class UsernamePasswordInput {
  // fields and types in username password input
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@ObjectType()
class FieldError {
  // fields and types of a field error
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  // field and types of a user response
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

export type MyContext = {
  // type of the context
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
};
