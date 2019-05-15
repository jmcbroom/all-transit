import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import { Card, Header, Segment } from "semantic-ui-react";

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

const HelpPage = ({ data }) => (
  <Layout title={"New to transit"}>
    <Segment.Group>
      {data.allExplainersYaml.edges
        .map(e => e.node)
        .map(n => (
          <Segment>
            <Link to={`/help/${n.slug}`}>
              <Header as="h3">{n.title}</Header>
              <Header sub>{n.subtitle}</Header>
            </Link>
          </Segment>
        ))}
    </Segment.Group>
  </Layout>
);

export const query = graphql`
  {
    allExplainersYaml {
      edges {
        node {
          title
          subtitle
          slug
        }
      }
    }
  }
`;
export default HelpPage;
