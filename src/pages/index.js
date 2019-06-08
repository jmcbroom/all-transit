import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import NewOrKnow from "../components/NewOrKnow";
import bus from "../images/tourbus.jpg";
import { Grid, Segment, Header, Image, Message, GridColumn } from "semantic-ui-react";
import { Detour } from "../components/Detour";

const IndexPage = ({ data }) => {
  console.log(data);

  let explainers = data.allExplainersYaml.edges.map(e => e.node);
  let agencies = data.postgres.agencies;

  return (
    <Layout title={"Detroit transit guide"} breadcrumb={false}>
      <Grid style={{}}>
        <Grid.Row width={12} centered style={{ backgroundColor: "#A0D5B3", padding: 0 }} />

        <Grid.Row width={16} style={{ height: 60 }} className="flourish" />

        <Grid.Row className="imageflourish">
          <Grid.Column computer={8} tablet={2} mobile={1} />
          <Grid.Column computer={6} tablet={12} mobile={14} style={{ marginTop: 50 }}>
            <Message floating style={{ background: "rgba(255,255,255,0.75)" }}>
              <Header as="h3" content="Welcome to DDOT's new site" />
              <p>
                Some lorem ipsum about how great the new site will be and remote enumeratic objects thirty one done. remote counting objects one hundred percent
                done.
              </p>
            </Message>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row width={16} style={{ height: 60 }} className="endflourish" />

        <Grid.Row only="computer">
          <Grid.Column width={12} style={{ marginTop: "-20px" }}>
            <NewOrKnow explainers={explainers} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row width={16} style={{ height: 90 }} className="negflourish" />
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
