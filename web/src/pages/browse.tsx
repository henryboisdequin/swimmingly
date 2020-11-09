import { Button, Flex, Stack } from "@chakra-ui/core";
import React from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Workout } from "../components/Workout";
import {
  AllPublicWorkoutsQuery,
  useAllPublicWorkoutsQuery,
  useMeQuery,
} from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface BrowseProps {}

const Browse: React.FC<BrowseProps> = ({}) => {
  const {
    data,
    error,
    loading,
    fetchMore,
    variables,
  } = useAllPublicWorkoutsQuery({
    variables: { limit: 15, cursor: null },
    notifyOnNetworkStatusChange: true,
  });
  const { data: meData } = useMeQuery();

  if (!loading && !data) {
    return <Error error={error} />;
  }

  return (
    <Layout>
      {!data && loading ? (
        <Loading />
      ) : (
        <Stack spacing={8}>
          {data!.allPublicWorkouts.workouts.map((w) => {
            return !w ? null : (
              <Workout key={w.id} meData={meData} workout={w} />
            );
          })}
        </Stack>
      )}
      {data && data.allPublicWorkouts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables.limit,
                  cursor:
                    data.allPublicWorkouts.workouts[
                      data.allPublicWorkouts.workouts.length - 1
                    ].createdAt,
                },
                updateQuery: (
                  previousValue,
                  { fetchMoreResult }
                ): AllPublicWorkoutsQuery => {
                  if (!fetchMoreResult) {
                    return previousValue as AllPublicWorkoutsQuery;
                  }

                  return {
                    __typename: "Query",
                    allPublicWorkouts: {
                      __typename: "PaginatedWorkouts",
                      hasMore: (fetchMoreResult as AllPublicWorkoutsQuery)
                        .allPublicWorkouts.hasMore,
                      workouts: [
                        ...(previousValue as AllPublicWorkoutsQuery)
                          .allPublicWorkouts.workouts,
                        ...(fetchMoreResult as AllPublicWorkoutsQuery)
                          .allPublicWorkouts.workouts,
                      ],
                    },
                  };
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Browse);
