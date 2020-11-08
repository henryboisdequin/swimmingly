import { CircularProgress, Flex } from "@chakra-ui/core";
import React from "react";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <CircularProgress isIndeterminate size="120px" />
    </Flex>
  );
};
