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
  Button,
  Label,
  Dropdown
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

const IndexPage = ({ data }) => {
  let destinations = data.allDestinationsYaml.edges
    .map(e => e.node)
    .map(n => {
      return {
        key: n.name,
        text: n.name,
        value: n.name,
        icon: "arrow circle right"
      };
    });

  console.log(destinations);

  return (
    <Layout title={"Detroit transit guide"}>
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column>
            <Segment.Group attached>
              <Label attached="top">Learn the system</Label>
              <Segment>
                <Link to={`/explainers`}>How to ride</Link>
              </Segment>
              <Segment>
                <Link to={`/fares`}>Fares</Link>
              </Segment>
              <Segment>
                <Link to={`/system-map`}>System map</Link>
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group>
              <Label attached="top">Local transit agencies</Label>
              <Segment>
                <Link to={`/ddot`}>DDOT</Link>
              </Segment>
              <Segment>
                {" "}
                <Link to={`/smart`}>SMART</Link>
              </Segment>
              <Segment>
                {" "}
                <Link to={`/the-ride`}>Ann Arbor</Link>
              </Segment>
              <Segment>
                {" "}
                <Link to={`/transit-windsor`}>Windsor</Link>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment.Group>
              <Label attached="top">Go out of town</Label>
              <Segment>
                <Dropdown
                  options={destinations}
                  placeholder="Get out of town"
                  fluid
                />
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
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
  }
`;

export default IndexPage;
