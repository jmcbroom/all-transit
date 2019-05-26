import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import { Header, Segment } from "semantic-ui-react";

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
