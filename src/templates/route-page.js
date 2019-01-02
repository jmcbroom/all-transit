import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import RouteStops from '../components/RouteStops';
import { Tab } from 'semantic-ui-react';
import feeds from '../feeds'

const RouteTrips = ({ trips, feedIndex }) => (
  <ul>
    {trips.map(t => (
      <li>{t.id} {feeds[feedIndex - 1].services[t.service]} {t.direction}</li>
    ))}
  </ul>
)

export default ({ data, pageContext }) => {
  const r = data.postgres.route[0];

  // derive some information from the trips
  let directions = Array.from(new Set(r.trips.map(t => t.direction)))
  let services = Array.from(new Set(r.trips.map(t => t.service)))

  // generate list of stops
  let stopsList = directions.map(d => {
    // filter trips by the current direction
    let tripsThisWay = r.trips.filter(t => { return t.direction === d })
    // sort by # of stopTimes desc and get top result
    let mostStopsTrip = tripsThisWay.sort((a, b) => {
      return b.stopTimes.length - a.stopTimes.length
    })[0]
    return mostStopsTrip
  })

  const panes = [
    { menuItem: 'Info', render: () => (<Tab.Pane>information</Tab.Pane>) },
    { menuItem: 'Schedule', render: () => <Tab.Pane><RouteTrips trips={r.trips} feedIndex={pageContext.feedIndex} /></Tab.Pane> },
    { menuItem: 'Stops', render: () => <Tab.Pane><RouteStops stops={stopsList} agency={r.agencyId} /></Tab.Pane> }
  ];
  
  return (
    <Layout>
      <div>
        <h1>{r.routeShortName} {r.routeLongName}</h1>
        <Tab menu={{attached: false}} panes={panes} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($routeNo: String!, $feedIndex: Int!) {
    postgres {
      route: allRoutesList(condition: {routeShortName: $routeNo, feedIndex: $feedIndex}) {
        agencyId
        routeShortName
        routeLongName
        routeDesc
        routeType
        routeUrl
        routeColor
        routeTextColor
        routeSortOrder
        trips: tripsByFeedIndexAndRouteIdList {
          id: tripId
          headsign: tripHeadsign
          direction: directionId
          service: serviceId
          stopTimes: stopTimesByFeedIndexAndTripIdList {
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
