import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import NewOrKnow from "../components/NewOrKnow";
import {
  Message,
  Grid,
  Placeholder,
  List,
  Segment,
  Header
} from "semantic-ui-react";
import { Detour } from "../components/Detour";

const IndexPage = ({ data }) => {
  console.log(data);

  let explainers = data.allExplainersYaml.edges.map(e => e.node);
  let agencies = data.postgres.agencies;

  let nokWidths = {
    mobile: 16,
    computer: 8
  };

  return (
    <Layout title={"Detroit transit guide"} breadcrumb={false}>
      <Grid style={{ width: "100vw" }} stackable padded>
        <Grid.Column only="computer" computer={4}>
          <Segment.Group>
            {agencies.map(a => {
              return (
                <Segment>
                  <Header as="h4" content={a.agencyName} />
                </Segment>
              );
            })}
            <Segment>
              <Header as="h4" content="Fares" />
            </Segment>
          </Segment.Group>
        </Grid.Column>

        <Grid.Column computer={4} mobile={16} tablet={16}>
          <Detour />
        </Grid.Column>

        <Grid.Column fluid {...nokWidths}>
          <NewOrKnow explainers={explainers} />
        </Grid.Column>
      </Grid>
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
