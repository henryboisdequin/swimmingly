import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Layout>
      <Container variant="small">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword({ variables: values });
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>
                If an account with that email exists, we sent you an email
                regarding changing your password.
              </Box>
            ) : (
              <Form>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="teal"
                >
                  Forgot Password
                </Button>
              </Form>
            )
          }
        </Formik>
      </Container>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
