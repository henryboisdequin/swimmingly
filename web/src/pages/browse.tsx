import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CircularProgress,
  Flex,
  Stack,
} from "@chakra-ui/core";
import React from "react";
import { Layout } from "../components/Layout";
import { Workout } from "../components/Workout";
import { useAllPublicWorkoutsQuery, useMeQuery } from "../generated/graphql";
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
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Layout>
      {!data && loading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
        >
          <CircularProgress isIndeterminate size="120px" />
        </Flex>
      ) : (
        <Stack spacing={8}>
          {data!.allPublicWorkouts.workouts.map((w) => {
            return !w ? null : <Workout meData={meData} workout={w} />;
          })}
        </Stack>
      )}
      {data && data.allPublicWorkouts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.allPublicWorkouts.workouts[
                      data.allPublicWorkouts.workouts.length - 1
                    ].createdAt,
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
