import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import RouteStops from "../components/RouteStops";
import RouteMap from "../components/RouteMap";
import { Tab } from "semantic-ui-react";
import wkx from "wkx";
import RouteSchedule from "../components/RouteSchedule";

export default ({ data, pageContext }) => {
  const r = data.postgres.route[0];
  console.log(pageContext);

  // generate GeoJSON features
  const features = r.shapes.map(s => {
    let wkbBuffer = new Buffer(s.geom, "hex");
    return {
      type: "Feature",
      properties: {
        color: `#${r.routeColor}`,
        textColor: `#${r.routeTextColor}`,
        order: r.routeSortOrder,
        short: r.routeShortName,
        long: r.routeLongName,
        desc: r.routeDesc,
        direction: s.direction
      },
      geometry: wkx.Geometry.parse(wkbBuffer).toGeoJSON()
    };
  });

  const panes = [
    {
      menuItem: "Map",
      render: () => (
        <Tab.Pane>
          <RouteMap shapes={features} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Schedule",
      render: () => (
        <Tab.Pane>
          <RouteSchedule
            trips={r.trips}
            shapes={r.shapes}
            feedIndex={pageContext.feedIndex}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Stops",
      render: () => (
        <Tab.Pane>
          <RouteStops trips={r.trips} shapes={r.shapes} agency={r.agencyId} />
        </Tab.Pane>
      )
    }
  ];

  return (
    <Layout>
      <div>
        <h1>
          {r.routeShortName} {r.routeLongName}
        </h1>
        <Tab menu={{ attached: true }} panes={panes} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($routeNo: String!, $feedIndex: Int!) {
    postgres {
      route: allRoutesList(
        condition: { routeShortName: $routeNo, feedIndex: $feedIndex }
      ) {
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
        trips: tripsByFeedIndexAndRouteIdList {
          id: tripId
          headsign: tripHeadsign
          direction: directionId
          service: serviceId
          stopTimes: stopTimesByFeedIndexAndTripIdList(
            condition: { timepoint: 1 }
          ) {
            timepoint
            arrivalTime {
              hours
              minutes
            }
            stop: stopByFeedIndexAndStopId {
              stopId
              stopDesc
              stopName
              stopLat
              stopLon
            }
          }
        }
      }
    }
  }
`;
