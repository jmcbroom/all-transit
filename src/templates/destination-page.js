import React from "./node_modules/react";
import { graphql } from "./node_modules/gatsby";
import { Header, Segment } from "./node_modules/semantic-ui-react";
import Layout from "../components/layout";

export default ({ data, pageContext }) => {
  let page = data.allDestinationsYaml.edges[0].node;
  return (
    <Layout title={`Get to ${page.name}`}>
      <Header as="h3">{page.name}</Header>
      {page.methods.map(e => (
        <p>
          {e.name} ${e.cost}
        </p>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query($name: String!) {
    allDestinationsYaml(filter: { name: { eq: $name } }) {
      edges {
        node {
          name
          slug
          methods {
            name
            cost
          }
        }
      }
    }
  }
`;
