import { Box, Button, Checkbox } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateWorkoutMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const Create: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createWorkout] = useCreateWorkoutMutation();
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          title: "",
          body: "",
          distance: "",
          private: isPrivate,
          notes: "",
        }}
        onSubmit={async (values) => {
          const updatedValues = values;
          updatedValues.private = isPrivate;

          const { errors } = await createWorkout({
            variables: { input: updatedValues },
            update: (cache) => {
              cache.evict({ fieldName: "workouts:{}" });
            },
          });

          if (!errors) {
            // if worked
            router.push("/browse");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="The Hardest Sprint Workout!"
              label="Title"
            />
            <Box mt={4}>
              <InputField
                textarea
                name="body"
                placeholder={`2x200 Free ez @ 3:00\n100 IM Fast @1:30\n10x100 Choice build to fast @1:20 
                `}
                label="Body"
              />
            </Box>
            <Box mt={4}>
              <InputField
                textarea
                name="notes"
                placeholder="The 200s were easy, I got a PB in the 100 IM, and the 100s were hard..."
                label="Notes"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="distance"
                placeholder="0"
                label="Total Distance"
              />
            </Box>
            <Box mt={4}>
              <Checkbox onChange={(e) => setIsPrivate(e.target.checked)}>
                Private
              </Checkbox>
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Create Workout
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Create);
