import { Box, Icon, Link, Text, useColorMode } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { withApollo } from "../utils/withApollo";

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = ({}) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Navbar />
      <Container>
        <Box
          border="2px"
          borderColor={colorMode === "dark" ? "white" : "black"}
          padding={20}
        >
          <Text fontSize={60} textAlign="center" fontWeight="bold">
            You are lost, swimming into the deeps of Swimmingly!
          </Text>
          <NextLink href="/">
            <Link>
              <Text textAlign="center">
                <Icon name="arrow-forward"></Icon>
                Go back to home
              </Text>
            </Link>
          </NextLink>
        </Box>
      </Container>
    </>
  );
};

export default withApollo({ ssr: false })(ErrorPage);
