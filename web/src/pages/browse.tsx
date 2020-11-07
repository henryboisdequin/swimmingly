import { Stack } from "@chakra-ui/core";
import React from "react";
import { Layout } from "../components/Layout";
import { useAllPublicWorkoutsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface BrowseProps {}

const Browse: React.FC<BrowseProps> = ({}) => {
  const {
    data,
    error,
    loading,
    fetchMore,
    variables,
  } = useAllPublicWorkoutsQuery({
    variables: { limit: 15, cursor: null },
  });

  return (
    <Layout>
      <Stack>
        <div>loading...</div>
      </Stack>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Browse);
