import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";
import feeds from "../feeds";
import Layout from "../components/layout";
import AgencyMap from "../components/AgencyMap";
import {
  Tab,
  Menu,
  Grid,
  List,
  Breadcrumb,
  Label,
  Header,
  Button,
  Segment,
  Table
} from "semantic-ui-react";
import RouteDisplay from "../components/RouteDisplay";

export default ({ data, pageContext }) => {
  const a = data.postgres.agency[0];
  const f = data.faresYaml;

  const routes = _.uniqBy(a.routes, "routeLongName");

  // get the routeShapes for the current agency and convert them to a flattened array of GeoJSON features
  const routeShapes = routes
    .map(r => {
      let m = r.shapes.map(rs => {
        return {
          type: "Feature",
          properties: {
            direction: rs.direction,
            routeColor: r.routeColor,
            routeTextColor: r.routeTextColor,
            routeSortOrder: parseInt(r.routeSortOrder),
            routeShortName: r.routeShortName,
            routeLongName: r.routeLongName,
            agencyId: a.agencyId
          },
          ...rs.geojson
        };
      });
      return m;
    })
    .reduce((a, c) => a.concat(c), [])
    .sort((a, b) => b.properties.order - a.properties.order);

  // put those features in a single FeatureCollection
  const routeFeatures = {
    type: "FeatureCollection",
    features: routeShapes
  };

  let color = feeds[pageContext.feedIndex - 1].color;

  return (
    <Layout title={a.agencyName}>
      <Grid columns={2} stackable padded>
        <Grid.Column>
          <Header color="grey" size="big" content="Fares" />
          <Table unstackable celled size="large">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Regular</Table.HeaderCell>
                <Table.HeaderCell>Reduced</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Base fare</Table.Cell>
                <Table.Cell>{f.base.regular}</Table.Cell>
                <Table.Cell>{f.base.reduced}</Table.Cell>
              </Table.Row>
              {f.passes.map(p => (
                <Table.Row>
                  <Table.Cell>{`${p.duration} pass`}</Table.Cell>
                  <Table.Cell>{p.cost.regular}</Table.Cell>
                  <Table.Cell>{p.cost.reduced}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Header color="grey" size="big" content="Bus routes" />
          <Grid
            columns={2}
            stackable
            style={{
              overflowY: "scroll",
              WebkitOverflowScrolling: "touch",
              maxHeight: "40vh",
              paddingRight: "1em"
            }}
          >
            {routes.map(r => (
              <Grid.Column key={r.routeLongName} style={{ padding: ".25rem" }}>
                <RouteDisplay route={r} />
              </Grid.Column>
            ))}
          </Grid>
        </Grid.Column>
        <Grid.Column>
          <Header color="grey" size="big" content="System info" />
          <Segment size="regular">
            <List>
              <List.Item
                icon={"desktop"}
                content={<a href={a.agencyUrl}>{a.agencyUrl}</a>}
              />
              <List.Item icon={"phone"} content={a.agencyPhone} />
            </List>
          </Segment>
          <Header color="grey" size="big" content="System map" />
          <AgencyMap routeFeatures={routeFeatures} />
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    postgres {
      agency: allAgenciesList(condition: { agencyId: $id }) {
        agencyId
        agencyName
        agencyUrl
        agencyPhone
        agencyFareUrl
        fares: fareAttributesByFeedIndexAndAgencyIdList {
          paymentMethod
          transfers
          transferDuration
          agencyId
        }
        routes: routesByFeedIndexAndAgencyIdList {
          routeLongName
          routeShortName
          routeColor
          routeTextColor
          routeDesc
          routeSortOrder
          feedIndex
          agencyId
          shapes: routeShapesByFeedIndexAndRouteIdList {
            direction
            geojson: simpleGeojson
          }
        }
      }
    }
    faresYaml(agencyId: { eq: $id }) {
      id
      agencyId
      base {
        regular
        reduced
      }
      passes {
        duration
        purchase
        cost {
          regular
          reduced
        }
      }
    }
  }
`;
