import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import NewOrKnow from "../components/NewOrKnow";

const IndexPage = ({ data }) => {
  let explainers = data.allExplainersYaml.edges.map(e => e.node);

  return (
    <Layout title={"Detroit transit guide"}>
      <NewOrKnow explainers={explainers} />
    </Layout>
  );
};

export const query = graphql`
  {
    postgres {
      agencies: allAgenciesList {
        agencyId
        agencyName
        agencyLongName
        agencyUrl
        agencyFareUrl
      }
    }
    allDestinationsYaml {
      edges {
        node {
          name
        }
      }
    }
    allExplainersYaml {
      edges {
        node {
          title
          subtitle
          slug
          level
          pages {
            title
            subtitle
            slug
            elements {
              type
              content
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
