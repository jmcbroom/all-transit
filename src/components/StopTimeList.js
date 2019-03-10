import React from "react";
import RouteDisplay from "./RouteDisplay";
import { List } from "semantic-ui-react";
import formatTime from "./Helpers";

export const StopTimeList = ({ list }) => {
  return (
    <List divided>
      {list.map(t => (
        <List.Item key={t.trip.tripId}>
          <RouteDisplay
            route={t.trip.route}
            size="tiny"
            inline
            style={{ width: "10em" }}
          />
          <List.Content>
            <List.Header>{formatTime(t.arrivalTime)}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
