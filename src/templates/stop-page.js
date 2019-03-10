import React from "react";
import { graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";
import StopMap from "../components/StopMap";
import StopInfo from "../components/StopInfo";

import feeds from "../feeds";
import { Tab } from "semantic-ui-react";
import { StopTimeList } from "../components/StopTimeList";

export default class Stop extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const s = data.postgres.stop;
    const times = s.times.filter(t => {
      return (
        feeds[pageContext.feedIndex - 1].services[t.trip.serviceId] ===
        "weekday"
      );
    });
    // sort by arrivalTime
    let sorted = times.sort((a, b) => {
      let times = [a, b].map(
        x =>
          x.arrivalTime.hours * 3600 +
          x.arrivalTime.minutes * 60 +
          x.arrivalTime.seconds
      );
      return times[0] - times[1];
    });
    // dedupe on arrivalTime: transit-windsor has a service for every day of the week
    // TODO: this will need more tweaks for t-w
    let uniq = _.uniqBy(sorted, x => {
      return (
        x.arrivalTime.hours * 3600 +
        x.arrivalTime.minutes * 60 +
        x.arrivalTime.seconds
      );
    });

    const panes = [
      {
        menuItem: "Home",
        render: () => (
          <Tab.Pane>
            <StopInfo stop={s} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Stop Times",
        render: () => (
          <Tab.Pane>
            <StopTimeList list={uniq} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Nearby",
        render: () => (
          <Tab.Pane>
            <StopMap lat={s.stopLat} lon={s.stopLon} routes={s.routeShapes} />
          </Tab.Pane>
        )
      }
    ];

    return (
      <Layout>
        <div>
          <h1>
            {s.stopName} / {s.stopDesc}
          </h1>
          <Tab menu={{ attached: false }} panes={panes} />
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  query($stopId: String!, $feedIndex: Int!) {
    postgres {
      stop: stopByFeedIndexAndStopId(feedIndex: $feedIndex, stopId: $stopId) {
        stopId
        stopName
        stopDesc
        stopLat
        stopLon
        geojson
        routeShapes: routeShapesList {
          routeByFeedIndexAndRouteId {
            agencyId
            routeShortName
            routeLongName
            routeType
            routeColor
            routeTextColor
          }
          direction
          dir
          geojson: simpleGeojson
        }
        times: stopTimesByFeedIndexAndStopIdList {
          trip: tripByFeedIndexAndTripId {
            tripId
            route: routeByFeedIndexAndRouteId {
              routeShortName
              routeLongName
              agencyId
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
