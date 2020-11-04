import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Workout } from "../entities/Workout";
import { isAuth } from "../middleware/isAuth";
import { MyContext, WorkoutInput } from "../types";

@Resolver()
export class WorkoutResolver {
  @Query(() => Workout, { nullable: true })
  workout(@Arg("id", () => Int) id: number): Promise<Workout | undefined> {
    return Workout.findOne(id);
  }

  @Query(() => [Workout], { nullable: true })
  aUsersWorkouts(
    @Arg("creatorId", () => Int) creatorId: number
  ): Promise<Workout[] | undefined> {
    return Workout.find({ where: { creatorId: creatorId } });
  }

  @Query(() => [Workout], { nullable: true })
  allPublicWorkouts(): Promise<Workout[] | undefined> {
    return Workout.find({ where: { private: false } });
  }

  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async createWorkout(
    @Arg("input") input: WorkoutInput,
    @Ctx() { req }: MyContext
  ): Promise<Workout> {
    return Workout.create({ ...input, creatorId: req.session.userId }).save();
  }

  @Mutation(() => Workout, { nullable: true })
  @UseMiddleware(isAuth)
  async addNotes(
    @Arg("id", () => Int) id: number,
    @Arg("notes") notes: string,
    @Ctx() { req }: MyContext
  ): Promise<Workout | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Workout)
      .set({ notes })
      .where(`id = :id and "creatorId" = :creatorId`, {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }
}
