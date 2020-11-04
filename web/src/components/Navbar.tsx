import { Box, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <NextLink href="/">
          <Link>
            <Heading as="h1" size="xl" letterSpacing={"-.1.5rem"}>
              Swimmingly
            </Heading>
          </Link>
        </NextLink>
      </Flex>

      <Box display={{ sm: "none", md: "block" }} mt={{ base: 4, md: 0 }}>
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
};
