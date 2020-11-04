import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Workout } from "../entities/Workout";
import { isAuth } from "../middleware/isAuth";
import { MyContext, WorkoutInput } from "../types";

@Resolver()
export class WorkoutResolver {
  @Query(() => Workout, { nullable: true })
  workout(@Arg("id", () => Int) id: number): Promise<Workout | undefined> {
    return Workout.findOne(id);
  }

  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async createWorkout(
    @Arg("input") input: WorkoutInput,
    @Ctx() { req }: MyContext
  ): Promise<Workout> {
    return Workout.create({ ...input, creatorId: req.session.userId }).save();
  }
}
