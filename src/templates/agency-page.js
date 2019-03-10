import React, { useState } from "react";
import { graphql } from "gatsby";
import _ from "lodash";
import Layout from "../components/layout";
import AgencyMap from "../components/AgencyMap";
import { Tab, Menu, Grid, List } from "semantic-ui-react";
import { RouteInfo } from "../components/RouteInfo";
import { RouteGrid } from "../components/RouteGrid";
import RouteDisplay from "../components/RouteDisplay";

export default ({ data }) => {
  const a = data.postgres.agency[0];

  const routes = _.uniqBy(a.routes, "routeLongName");

  const [mapRoutes, setMapRoutes] = useState([]);

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
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={10}>
                <AgencyMap
                  routeFeatures={routeFeatures}
                  setMapRoutes={setMapRoutes}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <List style={{ height: "60vh", overflowY: "scroll" }}>
                  {mapRoutes.map(r => (
                    <List.Item key={r.properties.routeShortName}>
                      <RouteDisplay route={r.properties} />
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
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

  let items = [
    {
      header: true,
      content: <Menu.Header content={a.agencyName} />
    }
  ];

  return (
    <Layout title={a.agencyName}>
      <Tab menu={{ attached: false, items: items }} panes={panes} />
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
