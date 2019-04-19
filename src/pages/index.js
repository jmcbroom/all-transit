import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import {
  Card,
  Header,
  Segment,
  Grid,
  Divider,
  Icon,
  Button
} from "semantic-ui-react";

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
    <Segment placeholder textAlign="center">
      <Header icon>Need basic information about the bus?</Header>
      <Button>Take me to the guide</Button>
    </Segment>
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Header as="h4">I'm new to the bus</Header>
        </Grid.Column>
        <Grid.Column>
          <Header as="h4">I know what's up</Header>
        </Grid.Column>
      </Grid>
      <Divider vertical>Or</Divider>
    </Segment>
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
      }
    }
  }
`;
export default IndexPage;
