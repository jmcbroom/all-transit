import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import NewOrKnow from "../components/NewOrKnow";
import {
  Grid,
  Segment,
  Header,
  Image
} from "semantic-ui-react";
import { Detour } from "../components/Detour";

const IndexPage = ({ data }) => {
  console.log(data);

  let explainers = data.allExplainersYaml.edges.map(e => e.node);
  let agencies = data.postgres.agencies;

  let nokWidths = {
    mobile: 16,
    computer: 12
  };

  return (
    <Layout title={"Detroit transit guide"} breadcrumb={false}>
      <Grid style={{ width: "100vw" }} stackable>
        <Grid.Row width={16} only="computer">
          <Image src="https://dummyimage.com/1080x240/addbc0/000"/>
        </Grid.Row>
        <Grid.Column computer={2}>
          {/* <Segment.Group>
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
          </Segment.Group> */}
        </Grid.Column>

        <Grid.Column computer={2} mobile={16} tablet={16}>
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
