import React, { useState } from "react";
import feeds from "../feeds";
import _ from "lodash";
import formatTime from "./Helpers";
import { Grid, List, ScrollSync, AutoSizer } from "react-virtualized";
import scrollbarSize from "dom-helpers/util/scrollbarSize";
import "react-virtualized/styles.css"; // only needs to be imported once

import { Dropdown } from "semantic-ui-react";

const RouteSchedule = ({ trips, shapes, feedIndex }) => {
  const [service, setService] = useState("weekday");
  const [direction, setDirection] = useState(0);

  let services = _.compact(_.uniq(trips.map(t => feeds[feedIndex - 1].services[t.service])));

  // filter trips by service/direction
  let filteredTrips = _.filter(trips, t => {
    return t.direction === direction && feeds[feedIndex - 1].services[t.service] === service;
    // then sort by the lowest/earliest arrivalTime
  });
  let sortedTrips = _.sortBy(filteredTrips, [t => t.stopTimes[0].arrivalTime.hours * 60 + t.stopTimes[0].arrivalTime.minutes]);

  let timepointList = sortedTrips
    .sort((a, b) => {
      return b.stopTimes.map(s => s.timepoint).reduce((acc, val) => acc + val) - a.stopTimes.map(s => s.timepoint).reduce((acc, val) => acc + val);
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

  console.log(sortedTrips, timepointList);

  let listArray = sortedTrips.map(st => {
    return timepointList.map((t, i) => {
      console.log(t, st.stopTimes);
      let filtered = st.stopTimes.filter(time => time.stop.stopId === t.stop.stopId);
      console.log(filtered);
      if (filtered.length > 0) {
        return formatTime(filtered[0].arrivalTime);
      } else {
        return `-`;
      }
    });
  });

  let timepoints = timepointList.map(t => t.stop.stopName.replace("Ave", "").replace("Hwy", ""));

  let cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div key={key} style={{ ...style, borderRight: `1px dotted #ddd` }}>
        {listArray[rowIndex][columnIndex]}
      </div>
    );
  };

  let timepointRenderer = ({ columnIndex, key, rowIndex, style }) => {
    let cellStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    };
    return (
      <div
        key={key}
        style={{
          ...style,
          ...cellStyle,
          borderRight: `2px solid #bbb`,
          padding: 3,
          fontSize: 10,
          lineHeight: "1.1em"
        }}
      >
        {timepoints[columnIndex]}
      </div>
    );
  };

  console.log(listArray);

  return (
    <>
      <div style={{ gridArea: "l", display: "flex", padding: 5, alignItems: "center", justifyContent: "space-evenly" }}>
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
          labeled
          button
          value={direction}
          icon="exchange"
          className="icon"
          style={{ minWidth: 100, maxWidth: 200 }}
        />
      </div>

      <div
        style={{
          gridArea: "i"
        }}
      >
        <ScrollSync>
          {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => (
            <AutoSizer>
              {({ width, height }) => {
                let columnWidth = 75;
                let headerHeight = 50;
                return (
                  <div className="Table">
                    <Grid
                      columnWidth={columnWidth}
                      columnCount={timepoints.length}
                      height={headerHeight}
                      cellRenderer={timepointRenderer}
                      rowHeight={headerHeight - scrollbarSize()}
                      rowCount={1}
                      onScroll={onScroll}
                      scrollLeft={scrollLeft}
                      width={width - scrollbarSize()}
                      style={{ textAlign: "center", fontWeight: 700, background: "#ddd", fontSize: "0.9em", Webkit }}
                    />
                    <Grid
                      onScroll={onScroll}
                      cellRenderer={cellRenderer}
                      columnCount={listArray[0].length}
                      columnWidth={columnWidth}
                      height={height - headerHeight}
                      width={width}
                      scrollLeft={scrollLeft}
                      rowCount={listArray.length}
                      rowHeight={30}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                );
              }}
            </AutoSizer>
          )}
        </ScrollSync>

        {/* <Table unstackable selectable collapsing compact celled striped>
        <Table.Header style={{ position: "sticky !important", top: 0, zIndex: 2 }}>
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
            {sortedTrips.map((tr, i) =>
              i % 8 !== 0 || i === 0 ? (
                <Table.Row key={tr.id} textAlign="center">
                  {timepointList.map((t, i) => {
                    let filtered = tr.stopTimes.filter(st => st.stop.stopId === t.stop.stopId && st.timepoint === 1);
                    if (filtered.length === 0) {
                      return <Table.Cell key={`${t.stop.stopId}_${tr.tripId}`}>-</Table.Cell>;
                    } else {
                      let st = filtered[0];
                      return (
                        <Table.Cell
                          key={`${st.stop.stopId}_${tr.tripId}`}
                          style={{
                            fontWeight: st.arrivalTime.hours > 11 && st.arrivalTime.hours < 25 ? "600" : "400"
                          }}
                        >
                          {formatTime(st.arrivalTime)}
                        </Table.Cell>
                      );
                    }
                  })}
                </Table.Row>
              ) : (
                <Table.Row key={i} textAlign="center">
                  {timepointList.map(t => (
                    <Table.HeaderCell
                      key={t.stop.stopId}
                      style={{
                        width: 90,
                        textAlign: "center",
                        fontSize: "0.6em",
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
              )
            )}
          </Table.Body>
        </Table> */}
      </div>
    </>
  );
};

export default RouteSchedule;
