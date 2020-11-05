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
import { MyContext, PaginatedWorkouts, WorkoutInput } from "../types";

@Resolver()
export class WorkoutResolver {
  @Query(() => Workout, { nullable: true })
  workout(@Arg("id", () => Int) id: number): Promise<Workout | undefined> {
    return Workout.findOne(id);
  }

  @Query(() => PaginatedWorkouts)
  async aUsersWorkouts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Arg("creatorId", () => Int) creatorId: number
  ): Promise<PaginatedWorkouts> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const workouts = await getConnection().query(
      `
      select w.*
      from workout w
      ${cursor ? `where w."createdAt" < $2` : ""}
      ${`where w."creatorId" = ${creatorId}`}
      order by w."createdAt" DESC
      limit $1
      `,
      replacements
    );

    return {
      workouts: workouts.slice(0, realLimit),
      hasMore: workouts.length === reaLimitPlusOne,
    };
  }

  @Query(() => PaginatedWorkouts)
  async allPublicWorkouts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedWorkouts> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const workouts = await getConnection().query(
      `
      select w.*
      from workout w
      ${cursor ? `where w."createdAt" < $2` : ""}
      where w.private = false
      order by w."createdAt" DESC
      limit $1
      `,
      replacements
    );

    return {
      workouts: workouts.slice(0, realLimit),
      hasMore: workouts.length === reaLimitPlusOne,
    };
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
