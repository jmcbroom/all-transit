import React from "react";
import RouteDisplay from "./RouteDisplay";
import { Segment } from "semantic-ui-react";
import formatTime from "./Helpers";

export const StopTimeList = ({ list }) => {
  return (
    <Segment.Group>
      {list.map(t => (
        <Segment>
          {formatTime(t.arrivalTime)}
          <RouteDisplay route={t.trip.route} inline />
        </Segment>
      ))}
    </Segment.Group>
  );
};
