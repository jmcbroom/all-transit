import React from "react";
import { graphql } from "gatsby";
import _ from "lodash";
import Layout from "../components/layout";
import AgencyMap from "../components/AgencyMap";
import { Grid, List, Header, Segment, Table } from "semantic-ui-react";
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

  return (
    <Layout title={a.agencyName} breadcrumb={true}>
      <Grid stackable padded>
        <Grid.Column computer={10}>
          <Header as="h3" color="grey" content="Fares" attached="top" />
          <Table unstackable celled padded size="large" attached="bottom">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>-</Table.HeaderCell>
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
            padded
            style={{
              overflowY: "scroll",
              WebkitOverflowScrolling: "touch",
              maxHeight: '70vh'
            }}
          >
            {routes.map(r => (
              <Grid.Column
                computer={8}
                tablet={8}
                mobile={16}
                key={r.routeLongName}
                style={{ padding: 5 }}
              >
                <RouteDisplay route={r} asLink />
              </Grid.Column>
            ))}
          </Grid>
        </Grid.Column>
        <Grid.Column computer={6}>
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
