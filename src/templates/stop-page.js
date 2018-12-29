import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
  const s = data.postgres.stop;

  return (
    <Layout>
      <div>
        <h1>{s.stopName} / {s.stopDesc}</h1>
        <section>
          <p>
            {s.times.length} arrivals here:
          </p>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($stopId: String!, $feedIndex: Int!) {
    postgres {
      stop: stopByFeedIndexAndStopId(feedIndex: $feedIndex, stopId: $stopId) {
        stopId
        stopName
        stopDesc
        stopLat
        stopLon
        times: stopTimesByFeedIndexAndStopIdList {
          trip: tripByFeedIndexAndTripId {
            tripId
            route: routeByFeedIndexAndRouteId {
              routeShortName
              routeLongName
            }
            directionId
            serviceId
            tripHeadsign
          }
          arrivalTime {
            hours
            minutes
            seconds
          }
        }
      }
    }
  }
`;
