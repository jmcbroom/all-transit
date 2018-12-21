import React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";

export default ({ data }) => {
  const s = data.postgres.stop;

  return (
    <Layout>
      <div>
        <h1>{s.stopDesc}</h1>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($stopId: String!, $feedIndex: Int!) {
    postgres {
      stop: stopByFeedIndexAndStopId(feedIndex: $feedIndex, stopId: $stopId) {
        stopDesc
      }
    }
  }
`;
