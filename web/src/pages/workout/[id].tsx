import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/core";
import moment from "moment";
import React from "react";
import { Error } from "../../components/Error";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import { useGetWorkoutFromUrl } from "../../utils/useGetWorkoutFromURL";
import { withApollo } from "../../utils/withApollo";

const Workout = ({}) => {
  const { data, error, loading } = useGetWorkoutFromUrl();

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  const error_ = {
    message: "Could not find that workout.",
    name: "404 Workout",
  };

  if (!data?.workout) {
    return (
      <Layout>
        <Error error={error_} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box flex={1}>
        <Heading>{data?.workout.title}</Heading>
        <Text fontSize="xl">By {data?.workout.creator.username}</Text>
        <Flex align="center">
          <Text flex={1} mt={4} fontSize="xl">
            {data?.workout.body}
            <Text mt={2} fontWeight="bold">
              Distance: {data?.workout.distance}
            </Text>
          </Text>
          <Box ml="auto">
            <Flex justifyContent="center" alignItems="center">
              <Icon name="calendar" aria-label="Calender" mr={1} />
              <Text>{moment().calendar(data?.workout.createdAt)}</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Workout);
