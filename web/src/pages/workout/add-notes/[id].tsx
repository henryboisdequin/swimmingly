import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Error } from "../../../components/Error";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { Loading } from "../../../components/Loading";
import {
  useWorkoutQuery,
  useAddNotesMutation,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";
import { withApollo } from "../../../utils/withApollo";

const AddNotes = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = useWorkoutQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [addNotes] = useAddNotesMutation();

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
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
    <Layout variant="small">
      <Formik
        initialValues={{ notes: "" }}
        onSubmit={async (values) => {
          await addNotes({ variables: { id: intId, ...values } });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="notes"
              placeholder="Today was so hard. The 100s were fine but the 200s were killer. Most of my 100s were 59/58s but some were 1:01s which were still fine. The 200s were 2:12s, very bad. Overall, a good and killer practice."
              label="Add Notes"
            />
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Add Notes
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(AddNotes);
