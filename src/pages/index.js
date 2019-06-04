import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import NewOrKnow from "../components/NewOrKnow";
import bus from "../images/tourbus.jpg";
import { Grid, Segment, Header, Image, Message } from "semantic-ui-react";
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
      <Grid style={{ width: "100vw" }}>
        <Grid.Row width={12} centered style={{ backgroundColor: "#A0D5B3", padding: 0 }} />
        
        <Grid.Row width={16} style={{ height: 48, padding: 0 }} className="flourish" />
        
        <Grid.Row width={16} className="imageflourish" />
        
        <Grid.Row width={16} style={{ height: 60 }} className="endflourish" />
        
        <Grid.Row width={16} centered>
          <Grid.Column width={2} only='computer'>
            fake
          </Grid.Column>
          <Grid.Column {...nokWidths} style={{marginTop: '-20px'}}>
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
