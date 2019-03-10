import React, { useState } from "react";
import { Dropdown, List } from "semantic-ui-react";
import _ from "lodash";

const RouteStops = ({ trips, shapes, agency }) => {
  const [direction, setDirection] = useState(0);

  const directionOptions = shapes.map((s, i) => {
    return {
      key: i + 1,
      text: _.capitalize(s.direction),
      value: parseInt(s.dir)
    };
  });

  let stopList = trips[direction].stopTimes.map(st => ({
    ...st.stop,
    timepoint: st.timepoint
  }));

  return (
    <div>
      <Dropdown
        onChange={(e, { value }) => {
          setDirection(value);
        }}
        options={directionOptions}
        placeholder="Choose an option"
        selection
        floating
        labeled
        button
        value={direction}
        icon="exchange"
        className="icon"
      />
      <List
        divided
        link
        size="huge"
        verticalAlign="middle"
        style={{ maxHeight: "60vh", overflowY: "scroll" }}
      >
        {stopList.map(s => (
          <List.Item as="a" href={`/${agency}/stop/${s.stopId}`}>
            <List.Icon
              name={s.timepoint ? "circle" : "circle outline"}
              verticalAlign="middle"
            />
            <List.Content>
              <List.Header>{s.stopName}</List.Header>
              <List.Description>stop ID: #{s.stopId}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default RouteStops;
