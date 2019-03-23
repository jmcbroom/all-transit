import React from "react";
import RouteBadge from "./RouteBadge";
import { List, Header } from "semantic-ui-react";
import formatTime from "./Helpers";

export const StopTimeList = ({ list }) => {
  return (
    <List
      divided
      attached
      size="large"
      style={{ height: "70vh", overflowY: "scroll" }}
    >
      <List.Header>Stop times here:</List.Header>
      {list.map(t => (
        <List.Item key={t.trip.tripId} inline fluid verticalAlign="middle">
          <List.Content verticalAlign="middle">
            <RouteBadge route={t.trip.route} size="normal" />
            {formatTime(t.arrivalTime, true)}
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
