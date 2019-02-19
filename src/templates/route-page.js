import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import RouteStops from "../components/RouteStops";
import RouteMap from "../components/RouteMap";
import { Tab } from "semantic-ui-react";
import feeds from "../feeds";
import _ from "lodash";
import wkx from "wkx";

const RouteTrips = ({ trips, feedIndex }) => {
  let filteredTrips = _.filter(trips, t => {
    return (
      t.direction === 0 &&
      feeds[feedIndex - 1].services[t.service] === "weekday"
    );
  }).sort((a, b) => {
    return (
      a.stopTimes[0].arrivalTime.hours * 60 +
      a.stopTimes[0].arrivalTime.minutes -
      (b.stopTimes[0].arrivalTime.hours * 60 +
        b.stopTimes[0].arrivalTime.minutes)
    );
  });
  let timepointList = filteredTrips
    .sort((a, b) => {
      return (
        b.stopTimes.map(s => s.timepoint).reduce((acc, val) => acc + val) -
        a.stopTimes.map(s => s.timepoint).reduce((acc, val) => acc + val)
      );
    })[0]
    .stopTimes.filter(st => {
      return st.timepoint === 1;
    });
  console.log(filteredTrips);
  return (
    <table>
      <thead>
        <tr>
          {timepointList.map(t => (
            <th key={t.stop.stopId}>{t.stop.stopName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredTrips.map(tr => (
          <tr key={tr.id}>
            {timepointList.map((t, i) => {
              let filtered = tr.stopTimes.filter(
                st => st.stop.stopId === t.stop.stopId && st.timepoint === 1
              );
              if (filtered.length === 0) {
                return <td>-</td>;
              } else {
                let st = filtered[0];
                return (
                  <td key={st.stop.stopId}>
                    {st.arrivalTime.hours} {st.arrivalTime.minutes}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
    // <ul>
    //   {filteredTrips.map(t => (
    //     <li>{t.id} {feeds[feedIndex - 1].services[t.service]} {t.direction}</li>
    //   ))}
    // </ul>
  );
};

export default ({ data, pageContext }) => {
  const r = data.postgres.route[0];

  // derive some information from the trips
  let directions = Array.from(new Set(r.trips.map(t => t.direction)));
  // let services = Array.from(new Set(r.trips.map(t => t.service)));

  // generate list of stops
  let stopsList = directions.map(d => {
    // filter trips by the current direction
    let tripsThisWay = r.trips.filter(t => {
      return t.direction === d;
    });
    // sort by # of stopTimes desc and get top result
    let mostStopsTrip = tripsThisWay.sort((a, b) => {
      return b.stopTimes.length - a.stopTimes.length;
    })[0];
    return mostStopsTrip;
  });

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
          <RouteTrips trips={r.trips} feedIndex={pageContext.feedIndex} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Stops",
      render: () => (
        <Tab.Pane>
          <RouteStops stops={stopsList} agency={r.agencyId} />
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
        <Tab menu={{ attached: false }} panes={panes} />
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
          stopTimes: stopTimesByFeedIndexAndTripIdList {
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
