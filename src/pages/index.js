import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import AllAgencyMap from "../components/AllAgencyMap";

const agencies = {
  ddot: {
    color: "rgba(0, 68, 69, 1)"
  },
  smart: {
    color: "rgba(240, 32, 0, 1)"
  },
  "the-ride": {
    color: "rgba(4, 50, 124, 1)"
  },
  "transit-windsor": {
    color: "rgba(0, 157, 211, 1)"
  }
};

const IndexPage = ({ data }) => (
  <Layout>
    <div
      style={{
        display: "grid",
        gridTemplate: `100px 100px / 1fr 1fr`,
        gridGap: 10
      }}
    >
      {data.postgres.agencies.map(a => (
        <section
          key={a.agencyId}
          style={{
            border: `.5em solid ${agencies[a.agencyId].color}`,
            background: "#eee",
            opacity: 0.85,
            padding: 10
          }}
        >
          <Link to={`/${a.agencyId}`}>
            <h3>{a.agencyName}</h3>
          </Link>
          <p>{a.routes.length} routes</p>
        </section>
      ))}
    </div>
    <AllAgencyMap agencies={data.postgres.agencies} />
  </Layout>
);

export const query = graphql`
  {
    postgres {
      agencies: allAgenciesList {
        agencyId
        agencyName
        agencyUrl
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
            geom
          }
        }
      }
    }
  }
`;
export default IndexPage;
