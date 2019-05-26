import React from "react";
import Layout from "../components/layout";
import AllAgencyMap from "../components/AllAgencyMap";
import { graphql } from "gatsby";

const SystemMap = ({ data }) => (
  <Layout title={"System map"}>
    <div style={{ height: "85vh", width: "100%" }}>
      <AllAgencyMap agencies={data.postgres.agencies} />
    </div>
  </Layout>
);

export const query = graphql`
  {
    postgres {
      agencies: allAgenciesList {
        agencyId
        agencyName
        agencyLongName
        agencyUrl
        agencyFareUrl
        routes: routesByFeedIndexAndAgencyIdList {
          agencyId
          routeShortName
          routeLongName
          routeDesc
          routeType
          routeUrl
          routeColor
          routeTextColor
          routeSortOrder
          shapes: routeShapesByFeedIndexAndRouteIdList {
            dir
            direction
            geojson
          }
        }
      }
    }
  }
`;
export default SystemMap;
