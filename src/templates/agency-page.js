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
  Button
} from "semantic-ui-react";
import { RouteInfo } from "../components/RouteInfo";
import { RouteGrid } from "../components/RouteGrid";
import RouteDisplay from "../components/RouteDisplay";

export default ({ data, pageContext }) => {
  const a = data.postgres.agency[0];

  const routes = _.uniqBy(a.routes, "routeLongName");

  const [mapRoutes, setMapRoutes] = useState([]);

  const [tabIndex, setTabIndex] = useState(0);

  console.log(feeds);

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

  const panes = [
    {
      menuItem: "Map",
      render: () => (
        <Tab.Pane>
          <Grid centered stackable>
            <Grid.Row>
              <Grid.Column width={10} />
              <Grid.Column width={6} />
            </Grid.Row>
          </Grid>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Fares",
      render: () => (
        <Tab.Pane>
          <RouteInfo fares={a.fares} url={a.agencyUrl} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Routes",
      render: () => (
        <Tab.Pane>
          <RouteGrid routes={routes} />
        </Tab.Pane>
      )
    }
  ];

  return (
    <Layout title={a.agencyName}>
      <AgencyMap routeFeatures={routeFeatures} setMapRoutes={setMapRoutes} />
      <List
        style={{
          gridArea: "i",
          maxHeight: "40vh",
          overflowY: "scroll",
          padding: 20
        }}
      >
        {mapRoutes.map(r => (
          <List.Item key={r.properties.routeShortName}>
            <RouteDisplay route={r.properties} />
          </List.Item>
        ))}
      </List>
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
