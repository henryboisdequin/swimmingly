import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { PaginatedWorkouts } from "../generated/graphql";
import { createWithApollo } from "./createWithApollo";
import { isServer } from "./isServer";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: {
      cookie: (isServer() ? ctx?.req?.headers.cookie : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            workouts: {
              keyArgs: [],
              merge(
                existing: PaginatedWorkouts | undefined,
                incoming: PaginatedWorkouts
              ): PaginatedWorkouts {
                return {
                  ...incoming,
                  workouts: [
                    ...(existing?.workouts || []),
                    ...incoming.workouts,
                  ],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
