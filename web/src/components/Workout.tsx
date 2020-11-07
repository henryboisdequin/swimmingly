import { Box, Flex, Heading, Icon, Link, Text } from "@chakra-ui/core";
import moment from "moment";
import NextLink from "next/link";
import React from "react";
import { MeQuery, WorkoutSnippetFragment } from "../generated/graphql";

interface WorkoutProps {
  meData: MeQuery | undefined;
  workout: WorkoutSnippetFragment;
}

export const Workout: React.FC<WorkoutProps> = ({ workout, meData }) => {
  return (
    <Flex key={workout.id} p={5} shadow="md" borderWidth="1px" minWidth={400}>
      <Box flex={1}>
        <NextLink
          href={meData?.me?.id ? "/workout/[id]" : "/login"}
          as={meData?.me?.id ? `/workout/${workout.id}` : "/login"}
        >
          <Heading fontSize="xl" as={Link}>
            {workout.title}
          </Heading>
        </NextLink>
        <Text>By {workout.creator.username}</Text>
        <Flex align="center">
          <Text flex={1} mt={4}>
            {workout.body}
            <Text mt={2} fontWeight="bold">
              Distance: {workout.distance}
            </Text>
          </Text>
          <Box ml="auto">
            <Flex justifyContent="center" alignItems="center">
              <Icon name="calendar" aria-label="Calender" mr={1} />
              <Text>{moment().calendar(workout.createdAt)}</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
