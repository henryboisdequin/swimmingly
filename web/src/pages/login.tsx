import { Box, Button, Flex, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Layout>
      <Container variant="small">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: { options: values },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login.user,
                  },
                });
                cache.evict({ fieldName: "workout:{}" });
              },
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                // if worked
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />

              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" />
              </Box>

              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
                <Flex>
                  <Box mt={2}>
                    <NextLink href="/forgot-password">
                      <Link ml="auto" style={{ color: "grey" }}>
                        Forgot Password?
                      </Link>
                    </NextLink>
                  </Box>

                  <Box ml="auto" mt={2} position="unset">
                    <NextLink href="/register">
                      <Link ml="auto" style={{ color: "grey" }}>
                        New to Swimmingly?
                      </Link>
                    </NextLink>
                  </Box>
                </Flex>
              </Box>
              <Button
                mt={4}
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
