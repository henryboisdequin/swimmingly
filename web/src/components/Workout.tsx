import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import moment from "moment";
import NextLink from "next/link";
import React from "react";
import { MeQuery, WorkoutSnippetFragment } from "../generated/graphql";

interface WorkoutProps {
  meData: MeQuery | undefined;
  workout: WorkoutSnippetFragment;
  addNotes?: boolean;
}

export const Workout: React.FC<WorkoutProps> = ({
  workout,
  meData,
  addNotes,
}) => {
  const regularHref = meData?.me?.id ? "/workout/[id]" : "/login";
  const regularAs = meData?.me?.id ? `/workout/${workout.id}` : "/login";
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex key={workout.id} p={5} shadow="md" borderWidth="1px" minWidth={400}>
      <Box flex={1}>
        <NextLink
          href={!addNotes ? regularHref : "/workout/add-notes/[id]"}
          as={!addNotes ? regularAs : `/workout/add-notes/${workout.id}`}
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
              {!addNotes ? null : (
                <>
                  <NextLink
                    href="/workout/add-notes/[id]"
                    as={`/workout/add-notes/${workout.id}`}
                  >
                    <IconButton
                      as={Link}
                      icon="add"
                      aria-label="Add Notes"
                      ml={5}
                    />
                  </NextLink>
                  <Button onClick={onOpen} maxW={200} mb={5} mt={5} ml={1}>
                    See Notes
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>{workout.title}'s Notes</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>{workout.notes}</Text>
                      </ModalBody>

                      <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
