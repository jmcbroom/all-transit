import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import { Card } from "semantic-ui-react";
import AllAgencyMap from "../components/AllAgencyMap";

const agencies = {
  ddot: {
    color: "rgba(0, 68, 69, 0.5)",
    description: "Detroit"
  },
  smart: {
    color: "rgba(170, 22, 0, 0.5)",
    description: "Suburbs, downtown & DTW"
  },
  "the-ride": {
    color: "rgba(4, 50, 124, 0.5)",
    description: "Ann Arbor & Ypsilanti"
  },
  "transit-windsor": {
    color: "rgba(0, 157, 211, 0.5)",
    description: "Windsor & downtown Detroit"
  }
};

const IndexPage = ({ data }) => (
  <Layout title={"Detroit transit guide"}>
    {data.allExplainersYaml.edges.map(e => e.node).map(n => (
      <div>
        <Link to={`/help/${n.slug}`} >
          {n.title}
        </Link>
      </div>
    ))}
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
    allExplainersYaml {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`;
export default IndexPage;
