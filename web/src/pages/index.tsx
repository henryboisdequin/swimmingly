import React from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Index = () => (
  <Layout>
    <div>hello</div>
  </Layout>
);

export default withApollo({ ssr: true })(Index);
