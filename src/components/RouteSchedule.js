import React, { useState } from "react";
import feeds from "../feeds";
import _ from "lodash";
import formatTime from "./Helpers";

import { Dropdown, Table, Menu } from "semantic-ui-react";

const RouteSchedule = ({ trips, shapes, feedIndex }) => {
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
  });
  console.log(filteredTrips);
  console.log(filteredTrips.map(t => t.stopTimes[0].arrivalTime));

  let sortedTrips = _.sortBy(filteredTrips, [
    t =>
      t.stopTimes[0].arrivalTime.hours * 60 + t.stopTimes[0].arrivalTime.minutes
  ]);

  let timepointList = sortedTrips
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
      <Menu secondary>
        <Dropdown
          onChange={(e, { value }) => {
            setService(value);
          }}
          options={serviceOptions}
          placeholder="Choose an option"
          selection
          floating
          button
          labeled
          height={10}
          value={service}
          icon="calendar alternate outline"
          className="icon"
          style={{ minWidth: 100, maxWidth: 200 }}
        />
        <Dropdown
          onChange={(e, { value }) => {
            setDirection(value);
          }}
          options={directionOptions}
          placeholder="Choose an option"
          selection
          floating
          inline
          labeled
          button
          value={direction}
          icon="exchange"
          className="icon"
          style={{ minWidth: 100, maxWidth: 200 }}
        />
      </Menu>
      <div
        style={{
          overflowX: "auto",
          overflowY: "auto",
          height: "60vh",
          alignContent: "center"
        }}
      >
        <Table unstackable selectable collapsing compact celled striped>
          <Table.Header>
            <Table.Row>
              {timepointList.map(t => (
                <Table.HeaderCell
                  key={t.stop.stopId}
                  style={{
                    width: 90,
                    textAlign: "center",
                    fontSize: "0.8em",
                    fontWeight: 800,
                    padding: 5,
                    lineHeight: "1.1em",
                    background: "#ddd"
                  }}
                >
                  {t.stop.stopName.replace("Ave", "").replace("Hwy", "")}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedTrips.map(tr => (
              <Table.Row key={tr.id} textAlign="center">
                {timepointList.map((t, i) => {
                  let filtered = tr.stopTimes.filter(
                    st => st.stop.stopId === t.stop.stopId && st.timepoint === 1
                  );
                  if (filtered.length === 0) {
                    return <Table.Cell>-</Table.Cell>;
                  } else {
                    let st = filtered[0];
                    return (
                      <Table.Cell
                        key={st.stop.stopId}
                        style={{
                          fontWeight:
                            st.arrivalTime.hours > 11 &&
                            st.arrivalTime.hours < 25
                              ? "600"
                              : "400"
                        }}
                      >
                        {formatTime(st.arrivalTime)}
                      </Table.Cell>
                    );
                  }
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default RouteSchedule;