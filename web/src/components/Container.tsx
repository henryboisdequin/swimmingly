import { Box } from "@chakra-ui/core";
import React from "react";

export type ContainerVariant = "small" | "regular";

interface ContainerProps {
  variant?: ContainerVariant;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};
