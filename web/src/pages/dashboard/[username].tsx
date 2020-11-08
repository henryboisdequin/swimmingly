import React from "react";
import { Layout } from "../../components/Layout";
import { withApollo } from "../../utils/withApollo";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <Layout>
      <h1>Dashboard</h1>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dashboard);
