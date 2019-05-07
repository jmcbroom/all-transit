import React from 'react';
import { graphql } from "gatsby";
import { Card, Icon, Image, Label, Segment } from 'semantic-ui-react';

import Layout from "../components/layout";

const Explainers = ({ data }) => (
  <Layout title={"Explainers"}>
    <Card.Group itemsPerRow={2}>
      {data.allExplainersYaml.edges.map(e => (
        <Card>
          <Segment raised basic>
            <Label color='purple' ribbon>
              Level {e.node.level}
            </Label>
            <Image src="https://dummyimage.com/865x239/addbc0/000" wrapped ui={true} />
          </Segment>
          <Card.Content>
            <Card.Header>{e.node.title}</Card.Header>
            <Card.Description>
              {e.node.subtitle}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='file' />
              {e.node.pages.length} pages
            </a>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
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

export default Explainers;
