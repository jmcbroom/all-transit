import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import RouteStops from "../components/RouteStops";
import RouteMap from "../components/RouteMap";
import RouteDisplay from "../components/RouteDisplay";
import { Tab, Menu } from "semantic-ui-react";
import wkx from "wkx";
import RouteSchedule from "../components/RouteSchedule";

export default ({ data, pageContext }) => {
  const r = data.postgres.route[0];
  const [tabIndex, setTabIndex] = useState(0);

  const longTrips = r.longTrips.sort((a, b) => a.directionId - b.directionId);

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
          <RouteStops trips={longTrips} shapes={r.shapes} agency={r.agencyId} />
        </Tab.Pane>
      )
    }
  ];

  return (
    <Layout>
      <div>
        <Menu>
          <Menu.Item>
            <RouteDisplay route={r} />
          </Menu.Item>
          <Menu.Menu position="right" inline>
            <Menu.Item onClick={() => setTabIndex(0)}>Map</Menu.Item>
            <Menu.Item onClick={() => setTabIndex(1)}>Schedule</Menu.Item>
            <Menu.Item onClick={() => setTabIndex(2)}>Stops</Menu.Item>
          </Menu.Menu>
        </Menu>
        <Tab activeIndex={tabIndex} panes={panes} />
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
        longTrips: longestTripsList {
          tripHeadsign
          directionId
          stopTimes: stopTimesByFeedIndexAndTripIdList(
            orderBy: STOP_SEQUENCE_ASC
          ) {
            stopSequence
            timepoint
            arrivalTime {
              seconds
              minutes
              hours
            }
            stop: stopByFeedIndexAndStopId {
              stopId
              stopName
              stopDesc
              stopLat
              stopLon
            }
          }
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
              seconds
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
