import React, { useState } from "react";
import { Link } from "gatsby";
import { Dropdown } from "semantic-ui-react";
import _ from "lodash";

const RouteStops = ({ stops, shapes, agency }) => {
  let stopList = stops[0].stopTimes.map(st => st.stop);
  const [direction, setDirection] = useState(0);

  const directionOptions = shapes.map((s, i) => {
    return {
      key: i + 1,
      text: _.capitalize(s.direction),
      value: parseInt(s.dir)
    };
  });

  return (
    <div>
      <Dropdown
        onChange={(e, { value }) => {
          console.log(value);
          setDirection(value);
        }}
        options={directionOptions}
        placeholder="Choose an option"
        selection
        floating
        labeled
        button
        value={direction}
        icon="filter"
        className="icon"
      />
      <ul>
        {stopList.map(s => (
          <Link to={`${agency}/stop/${s.stopId}`}>
            <li>
              {s.stopName} / {s.stopDesc}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RouteStops;
