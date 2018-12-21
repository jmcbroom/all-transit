import React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";

export default ({ data }) => {
  const r = data.postgres.route[0];

  return (
    <Layout>
      <div>
        <h1>{r.routeShortName} {r.routeLongName}</h1>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($routeNo: String!) {
    postgres {
      route: allRoutesList(condition: {routeShortName: $routeNo}) {
        routeId
        routeLongName
        routeShortName
        agencyId
      }
    }
  }
`;
