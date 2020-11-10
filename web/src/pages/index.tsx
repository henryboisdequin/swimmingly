import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import CookieConsent from "react-cookie-consent";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { useMeQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  let buttons: JSX.Element;

  if (data?.me) {
    buttons = (
      <Box mt={10}>
        <Flex justifyContent="center" alignItems="center">
          <NextLink href="/create">
            <Button as={Link}>Create a Workout</Button>
          </NextLink>
          <NextLink href="/browse">
            <Box ml={4}>
              <Button as={Link}>Browse Public Workouts</Button>
            </Box>
          </NextLink>
          <NextLink href={`/dashboard/${data.me!.username}`}>
            <Box ml={4}>
              <Button as={Link}>Browse Your Workouts</Button>
            </Box>
          </NextLink>
        </Flex>
      </Box>
    );
  } else {
    buttons = (
      <Box mt={10}>
        <Flex justifyContent="center" alignItems="center">
          <NextLink href="/login">
            <Button as={Link}>Create a Workout</Button>
          </NextLink>
          <NextLink href="/browse">
            <Box ml={4}>
              <Button as={Link}>Browse Public Workouts</Button>
            </Box>
          </NextLink>
          <NextLink href={`/login`}>
            <Box ml={4}>
              <Button as={Link}>Browse Your Workouts</Button>
            </Box>
          </NextLink>
        </Flex>
      </Box>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Swimmingly</title>
      </Head>
      <Text fontSize="20px">
        Swimmingly is a platform for coaches and swimmers alike to share and
        keep track of their swimming workouts. Post a workout privately, or
        publicly, the choice is yours!
      </Text>
      {buttons}
      <CookieConsent
        style={{ background: "teal" }}
        buttonStyle={{
          backgroundColor: "lightblue",
          color: "teal",
          borderRadius: 10,
        }}
        buttonText="I understand"
      >
        Swimmingly uses cookies to enhance the users experience. Yum!
      </CookieConsent>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
