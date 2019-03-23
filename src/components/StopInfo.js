import React from "react";
import _ from "lodash";
import RouteDisplay from "./RouteDisplay";
import { List } from "semantic-ui-react";

const StopInfo = ({ stop }) => {
  let uniqRoutes = _.uniqBy(stop.times, t => {
    return t.trip.route.routeLongName;
  }).map(ur => ur.trip.route);

  return (
    <List>
      {uniqRoutes.map(ur => (
        <List.Item key={ur.routeLongName}>
          <RouteDisplay key={ur.routeShortName} route={ur} size="tiny" />
        </List.Item>
      ))}
    </List>
  );
};

export default StopInfo;
