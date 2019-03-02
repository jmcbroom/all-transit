import React, { useState } from "react";
import feeds from "../feeds";
import _ from "lodash";
import formatTime from "./Helpers";

import { Dropdown } from "semantic-ui-react";

export const RouteSchedule = ({ trips, shapes, feedIndex }) => {
  const [service, setService] = useState("weekday");
  const [direction, setDirection] = useState(0);

  let services = _.compact(
    _.uniq(trips.map(t => feeds[feedIndex - 1].services[t.service]))
  );

  // filter trips by service/direction
  let filteredTrips = _.filter(trips, t => {
    return (
      t.direction === direction &&
      feeds[feedIndex - 1].services[t.service] === service
    );
    // then sort by the lowest/earliest arrivalTime
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

  let serviceOptions = services.map((s, i) => {
    return {
      key: i + 1,
      text: _.capitalize(s),
      value: s
    };
  });

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
          setService(value);
        }}
        options={serviceOptions}
        placeholder="Choose an option"
        selection
        floating
        labeled
        button
        value={service}
        icon="calendar alternate outline"
        className="icon"
      />
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
                    <td key={st.stop.stopId}>{formatTime(st.arrivalTime)}</td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
