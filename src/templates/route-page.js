import React from "react";
import { graphql } from "gatsby";
import _ from 'lodash';
import Layout from "../components/layout";
import RouteStops from '../components/RouteStops';

export default ({ data }) => {
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
  
  return (
    <Layout>
      <div>
        <h1>{r.routeShortName} {r.routeLongName}</h1>
        <section>
          <h3>Schedule of trips</h3>
          <p>{r.trips.length} trips</p>
          <h4>services: {services.join(", ")}</h4>
          <h4>directions: {directions.join(", ")}</h4>
        </section>
        <RouteStops stops={stopsList} agency={r.agencyId} />
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
