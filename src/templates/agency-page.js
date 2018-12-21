import React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";

export default ({ data }) => {
  const a = data.postgres.agency[0];

  return (
    <Layout>
      <div>
        <h1>{a.agencyName}</h1>
        <ul>
        {a.routesByFeedIndexAndAgencyIdList.map(r => (
            <li>{r.routeLongName} <Link to={`${r.agencyId}/route/${Number(r.routeShortName)}`}>page</Link></li>
        ))}
        </ul>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    postgres {
      agency: allAgenciesList(condition: {agencyId: $id}) {
        agencyName
        routesByFeedIndexAndAgencyIdList{
            routeLongName
            routeShortName
            agencyId
        }      
      }
    }
  }
`;
