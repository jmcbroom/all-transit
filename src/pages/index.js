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
      <Button as='a' href={`./explainers`}  >Take me to the guide</Button>
    </Segment>
    <Segment placeholder textAlign="center">
      <Header icon>How much is the fare?</Header>
      <Button as='a' href={`./fares`}  >The bus costs money</Button>
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
