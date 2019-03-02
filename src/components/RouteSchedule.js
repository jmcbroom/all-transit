import React, { useState } from "react";
import feeds from "../feeds";
import _ from "lodash";

export const RouteSchedule = ({ trips, feedIndex }) => {
  const [service, setService] = useState("saturday");

  console.log(service, setService);

  let filteredTrips = _.filter(trips, t => {
    return (
      t.direction === 0 && feeds[feedIndex - 1].services[t.service] === service
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
  );
};
