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
  Segment
} from "semantic-ui-react";
import { RouteInfo } from "../components/RouteInfo";
import { RouteGrid } from "../components/RouteGrid";
import RouteDisplay from "../components/RouteDisplay";

export default ({ data, pageContext }) => {
  const a = data.postgres.agency[0];

  const routes = _.uniqBy(a.routes, "routeLongName");

  const [tabIndex, setTabIndex] = useState(0);

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

  let color = feeds[pageContext.feedIndex - 1].color;

  return (
    <Layout title={a.agencyName}>
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column>
            <List
              style={{
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
                padding: 10,
                maxHeight: "50vh"
              }}
            >
              {routes.map(r => (
                <List.Item key={r.routeShortName}>
                  <RouteDisplay route={r} />
                </List.Item>
              ))}
            </List>
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
            <Segment.Group attached>
              <Label attached="top">Go out of town</Label>
              <Segment>
                <Link to={`/get-to/ann-arbor`}>Ann Arbor</Link>
              </Segment>
              <Segment>
                <Link to={`/get-to/cleveland`}>Cleveland</Link>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
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
  }
`;
