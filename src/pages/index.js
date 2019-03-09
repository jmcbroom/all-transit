import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import AllAgencyMap from "../components/AllAgencyMap";
import { Card, Header, Grid, List, Divider } from "semantic-ui-react";

const agencies = {
  ddot: {
    color: "rgba(0, 68, 69, 0.5)"
  },
  smart: {
    color: "rgba(170, 22, 0, 0.5)"
  },
  "the-ride": {
    color: "rgba(4, 50, 124, 0.5)"
  },
  "transit-windsor": {
    color: "rgba(0, 157, 211, 0.5)"
  }
};

const IndexPage = ({ data }) => (
  <Layout title="Overview">
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          {/* <Header as="h2" content="Bus systems" /> */}
          {/* <Divider /> */}
          <Card.Group>
            {data.postgres.agencies.map(a => (
              <Card key={a.agencyId} fluid>
                <Card.Content
                  style={{
                    background: agencies[a.agencyId].color,
                    backgroundOpacity: 0.1
                  }}
                >
                  <Card.Header as="a" href={`/${a.agencyId}`}>
                    {a.agencyName}
                  </Card.Header>
                  <Card.Meta>{a.routes.length} bus routes</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <List>
                    <List.Item
                      as="a"
                      href={a.agencyUrl}
                      icon="linkify"
                      content="Website"
                    />
                    <List.Item
                      as="a"
                      href={a.agencyFareUrl}
                      icon="ticket"
                      content="Fares/Passes"
                    />
                  </List>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
        <Grid.Column width={10}>
          <AllAgencyMap agencies={data.postgres.agencies} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
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
        routes: routesByFeedIndexAndAgencyIdList {
          agencyId
          routeShortName
          routeLongName
          routeDesc
          routeType
          routeUrl
          routeColor
          routeTextColor
          routeSortOrder
          shapes: routeShapesByFeedIndexAndRouteIdList {
            dir
            direction
            geom
          }
        }
      }
    }
  }
`;
export default IndexPage;
