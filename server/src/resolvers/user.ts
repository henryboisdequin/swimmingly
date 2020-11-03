import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { User } from "../entities/User";
import { MyContext, UsernamePasswordInput, UserResponse } from "../types";
import { sendEmail } from "../utils/sendEmail";
import { validateRegister } from "../utils/validateRegister";

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    // strong password regex
    const strongPassword = /^[A-Za-z]\w{7,14}$/;

    // if the new password doesn't meet requirements, return error
    if (!newPassword.match(strongPassword)) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "New password is not strong enough.",
          },
        ],
      };
    }

    // get key from redis
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    // return if token doesn't exist or is expired
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token doesn't exist or is expired.",
          },
        ],
      };
    }

    // find the user with the user id
    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    // if no user return
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists.",
          },
        ],
      };
    }

    // update the user to have their new password
    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      }
    );

    // change password with that link once by deleting the key stored in redis
    await redis.del(key);

    // login user
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // user not in db
      return false;
    }

    // create a token
    const token = v4();

    // set the token in the redis db
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );

    // send email to user
    await sendEmail(
      email,
      `
Dear User,
\n
I hope you are doing well.
\n
Click this link to reset your password: <a href="http://localhost:3000/change-password/${token}">link</a>.
\n
Best, 
Henry Boisdequin From <a href="http://localhost:3000/">Swimmingly</a>
    `,
      587
    );

    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      // not logged in
      return null;
    }

    // return the user with that id
    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ) {
    // validate the register
    const errors = validateRegister(options);

    // if there are errors, return
    if (errors) {
      return { errors };
    }

    // hash the password
    const hashedPassword = await argon2.hash(options.password);
    let user;

    try {
      // insert the user into the db
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        // duplicate username error
        return {
          errors: [
            {
              field: "username",
              message: "Username already exists.",
            },
          ],
        };
      }
    }

    // set a 🍪 on the user, keep them logged in
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ) {
    // get the user
    const user = await User.findOne({
      where: { username: options.username, email: options.email },
    });

    // return if username/email isn't correct (guard clause)
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Could not find a user with that username or email.",
          },
        ],
      };
    }

    // verify the password
    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password.",
          },
        ],
      };
    }

    // set the session to the user we got
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    // logout the user
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        // clear the cookie
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          // resolved - false
          resolve(false);
          return;
        }
        // resolved - true
        resolve(true);
      })
    );
  }
}
