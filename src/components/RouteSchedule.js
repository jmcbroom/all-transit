import React, { useState } from "react";
import feeds from "../feeds";
import _ from "lodash";
import formatTime from "./Helpers";
import { Grid, List, ScrollSync, AutoSizer } from "react-virtualized";
import scrollbarSize from "dom-helpers/util/scrollbarSize";
import "react-virtualized/styles.css"; // only needs to be imported once

import { Dropdown } from "semantic-ui-react";

const RouteSchedule = ({ trips, shapes, feedIndex, color }) => {
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

  let sortedTrips = filteredTrips.sort((a, b) => {
    let c = null
    let d = null

    for (let t of timepointList) {
        let aFilter = a.stopTimes.filter(st => st.stop.stopId === t.stop.stopId)
        let bFilter = b.stopTimes.filter(st => st.stop.stopId === t.stop.stopId)
        if(bFilter.length > 0 && aFilter.length > 0) {
          c = aFilter[0]
          d = bFilter[0]
          break;
        }
      }
      return (c.arrivalTime.hours * 60 + c.arrivalTime.minutes) > (d.arrivalTime.hours * 60 + d.arrivalTime.minutes)
  })

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

  // array of arrivalTimes
  let listArray = sortedTrips.map(st => {
    return timepointList.map((t, i) => {
      let filtered = st.stopTimes.filter(
        time => time.stop.stopId === t.stop.stopId
      );
      if (filtered.length > 0) {
        return filtered[0].arrivalTime;
      } else {
        return `-`;
      }
    });
  });

  let timepoints = timepointList.map(t =>
    t.stop.stopName.replace("Ave", "").replace("Hwy", "")
  );

  let cellStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFeatureSettings: "'tnum' 1"
  };

  let cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    let time = listArray[rowIndex][columnIndex];
    if (time === `-`) {
      return (
        <div
          key={key}
          style={{
            ...style,
            ...cellStyle,
            background: "#eee",
            borderRight: `2px dotted #bbb`,
            borderBottom:
              rowIndex % 5 === 0 && rowIndex > 0
                ? `2px solid #ddd`
                : `0px solid #ddd`
          }}
        >
          {`-`}
        </div>
      );
    } else {
      return (
        <div
          key={key}
          style={{
            ...style,
            ...cellStyle,
            fontWeight: time.hours > 11 && time.hours < 24 ? 600 : 400,
            borderRight: `2px solid #ddd`,
            borderBottom:
              rowIndex % 5 === 0 && rowIndex > 0
                ? `2px solid #ddd`
                : `0px solid #ddd`
          }}
        >
          {formatTime(listArray[rowIndex][columnIndex])}
        </div>
      );
    }
  };

  let timepointRenderer = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div
        key={key}
        style={{
          ...style,
          ...cellStyle,
          borderRight: `2px solid #555`,
          borderTop: `2px solid #555`,
          borderBottom: `2px solid #555`,
          background: `#${color}`,
          color: 'white',
          fontWeight: 600,
          characterSpacing: '-1px',
          padding: 3,
          fontSize: 11,
          lineHeight: "1em"
        }}
      >
        {timepoints[columnIndex]}
      </div>
    );
  };

  console.log(listArray);

  return (
    <>
      <div
        style={{
          gridArea: "l",
          display: "flex",
          padding: 5,
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
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
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollLeft,
            scrollTop,
            scrollWidth
          }) => (
            <AutoSizer>
              {({ width, height }) => {
                let columnWidth = 90;
                let headerHeight = 50;
                return (
                  <>
                    <Grid
                      columnWidth={columnWidth}
                      columnCount={timepoints.length}
                      height={headerHeight}
                      cellRenderer={timepointRenderer}
                      rowHeight={headerHeight}
                      rowCount={1}
                      scrollLeft={scrollLeft}
                      width={width - scrollbarSize()}
                      style={{pointerEvents: 'none'}}
                    />
                    <Grid
                      onScroll={onScroll}
                      cellRenderer={cellRenderer}
                      columnCount={timepointList.length}
                      columnWidth={columnWidth}
                      height={height - headerHeight}
                      width={width - scrollbarSize()}
                      scrollLeft={scrollLeft}
                      rowCount={listArray.length}
                      rowHeight={24}
                    />
                  </>
                );
              }}
            </AutoSizer>
          )}
        </ScrollSync>
      </div>
    </>
  );
};

export default RouteSchedule;
