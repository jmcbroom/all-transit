import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import RouteStops from "../components/RouteStops";
import RouteMap from "../components/RouteMap";
import feeds from "../feeds";
import { Tab } from "semantic-ui-react";
import RouteSchedule from "../components/RouteSchedule";

export default ({ data, pageContext }) => {
  const r = data.postgres.route[0];

  const longTrips = r.longTrips.sort((a, b) => a.directionId - b.directionId);

  let stopFeatures = [];

  longTrips.forEach(lt => {
    let stops = lt.stopTimes.map(st => st.stop.geojson);
    stopFeatures = stopFeatures.concat(stops);
  });

  let stops = {
    type: "FeatureCollection",
    features: stopFeatures
  };

  // generate GeoJSON features
  const features = r.shapes.map(s => {
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
      ...s.geojson
    };
  });

  const panes = [
    {
      menuItem: "Schedule",
      render: () => <Tab.Pane />
    },
    {
      menuItem: "Route Map",
      render: () => (
        <Tab.Pane>
          <RouteMap shapes={features} stops={stops} />
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
    <Layout
      title={`${feeds[pageContext.feedIndex - 1].display} ${r.routeLongName}`}
      color={feeds[pageContext.feedIndex - 1].color}
    >
      <RouteMap shapes={features} stops={stops} />
      <RouteSchedule
        trips={r.trips}
        shapes={r.shapes}
        feedIndex={pageContext.feedIndex}
      />
      {/* <Breadcrumb>
        <Link to={`/`}>
          <Breadcrumb.Section>Buses</Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider>></Breadcrumb.Divider>
        <Link to={`/${feeds[pageContext.feedIndex - 1].name}`}>
          <Breadcrumb.Section>
            {feeds[pageContext.feedIndex - 1].display}
          </Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider>></Breadcrumb.Divider>
        <Breadcrumb.Section active>Route: {r.routeLongName}</Breadcrumb.Section>
      </Breadcrumb>
      <Menu>
        <Menu.Menu position="left">
          <RouteDisplay route={r} background="white" />
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item onClick={() => setTabIndex(0)}>Schedule</Menu.Item>
          <Menu.Item onClick={() => setTabIndex(1)}>Route Map</Menu.Item>
          <Menu.Item onClick={() => setTabIndex(2)}>Stops</Menu.Item>
        </Menu.Menu>
      </Menu>
      <Tab
        activeIndex={tabIndex}
        menu={{ style: { display: "none" } }}
        panes={panes}
      /> */}
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
          geojson: simpleGeojson
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
              geojson
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
