import React from "react";
import { graphql } from "gatsby";
import _ from "lodash";
import wkx from "wkx";
import Layout from "../components/layout";
import AgencyMap from "../components/AgencyMap";
import { Tab, Menu } from "semantic-ui-react";
import { RouteInfo } from "../components/RouteInfo";
import { RouteGrid } from "../components/RouteGrid";
import RouteDisplay from "../components/RouteDisplay";

export default ({ data }) => {
  const a = data.postgres.agency[0];

  const routes = _.uniqBy(a.routes, "routeLongName");

  // get the routeShapes for the current agency and convert them to a flattened array of GeoJSON features
  const routeShapes = routes
    .map(r => {
      let m = r.shapes.map(rs => {
        let wkbBuffer = new Buffer(rs.geom, "hex");
        return {
          type: "Feature",
          properties: {
            dir: rs.direction,
            color: `#${r.routeColor}`,
            textColor: `#${r.routeTextColor}`,
            order: parseInt(r.routeSortOrder),
            short: r.routeShortName,
            long: r.routeLongName,
            agency: a.agencyId
          },
          geometry: wkx.Geometry.parse(wkbBuffer).toGeoJSON()
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
          <AgencyMap routeFeatures={routeFeatures} />
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
            geom
          }
        }
      }
    }
  }
`;
