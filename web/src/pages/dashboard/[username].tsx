import { Button, Flex, Heading, Stack } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { Error } from "../../components/Error";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import { Workout } from "../../components/Workout";
import {
  AUsersWorkoutsQuery,
  useAUsersWorkoutsQuery,
  useMeQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const { data: meData } = useMeQuery();
  const router = useRouter();
  const urlUsername = router.query.username;
  const { data, error, loading, fetchMore, variables } = useAUsersWorkoutsQuery(
    {
      variables: { limit: 15, cursor: null, creatorId: meData?.me.id },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (meData?.me.username !== urlUsername) {
    const error_ = {
      message: "Can't access another users dashboard.",
      name: "Privacy Error",
    };

    return (
      <Layout>
        <Error error={error_} />
      </Layout>
    );
  }

  if (!loading && !data) {
    return <Error error={error} />;
  }

  return (
    <Layout>
      {!data && loading ? (
        <Loading />
      ) : (
        <Stack spacing={8}>
          <Heading>{urlUsername}'s Dashboard</Heading>
          {data!.aUsersWorkouts.workouts.map((w) => {
            return !w ? null : (
              <Workout addNotes={true} key={w.id} meData={meData} workout={w} />
            );
          })}
        </Stack>
      )}
      {data && data.aUsersWorkouts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables.limit,
                  cursor:
                    data.aUsersWorkouts.workouts[
                      data.aUsersWorkouts.workouts.length - 1
                    ].createdAt,
                },
                updateQuery: (
                  previousValue,
                  { fetchMoreResult }
                ): AUsersWorkoutsQuery => {
                  if (!fetchMoreResult) {
                    return previousValue as AUsersWorkoutsQuery;
                  }

                  return {
                    __typename: "Query",
                    aUsersWorkouts: {
                      __typename: "PaginatedWorkouts",
                      hasMore: (fetchMoreResult as AUsersWorkoutsQuery)
                        .aUsersWorkouts.hasMore,
                      workouts: [
                        ...(previousValue as AUsersWorkoutsQuery).aUsersWorkouts
                          .workouts,
                        ...(fetchMoreResult as AUsersWorkoutsQuery)
                          .aUsersWorkouts.workouts,
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

export default withApollo({ ssr: true })(Dashboard);
