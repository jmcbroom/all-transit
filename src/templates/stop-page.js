import React, { useState } from "react";
import { graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";
import StopMap from "../components/StopMap";
import RouteDisplay from "../components/RouteDisplay";

import feeds from "../feeds";
import { Grid, Dropdown } from "semantic-ui-react";
import { StopTimeList } from "../components/StopTimeList";

const StopRoutes = ({ stop, list }) => {
  let uniqRoutes = _.uniqBy(stop.times, t => {
    return t.trip.route.routeLongName;
  }).map(ur => ur.trip.route);

  console.log(uniqRoutes)

  let dropdownOptions = uniqRoutes.map(u => {
    return({
      key: u.routeShortName.toString(), text: u.routeLongName, value: u.routeShortName.toString(), content: <RouteDisplay key={u.routeShortName} route={u} size="big" />
    })
  })

  console.log(dropdownOptions)

  let [route, setRoute] = useState(uniqRoutes[0])

  return (
    <div>      
      StopRoutes
      <Dropdown
        placeholder='select Friends'
        fluid
        selection
        options={dropdownOptions}
        / >

      <StopTimeList list={list} />
    </div>
  )
}

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

    return (
      <Layout title={s.stopDesc}>
        <Grid stackable padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <StopMap lat={s.stopLat} lon={s.stopLon} routes={s.routeShapes} />
            </Grid.Column>
            <Grid.Column width={6}>
              <StopRoutes stop={s} list={uniq} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
              routeColor
              routeTextColor
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
