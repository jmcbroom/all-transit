import React from "react";
import RouteBadge from "./RouteBadge";
import { List, Header, Grid, Segment } from "semantic-ui-react";
import formatTime from "./Helpers";

export const StopTimeList = ({ list }) => {
  console.log(list);

  let am = list.filter(l => l.arrivalTime.hours < 12);
  let pm = list.filter(
    l => l.arrivalTime.hours > 11 && l.arrivalTime.hours < 24
  );
  let nite = list.filter(l => l.arrivalTime.hours > 23);

  console.log(am, pm, nite);

  return (
    <>
      <Segment.Group attached="top">
        <Segment>
          <Header as="h3" content="Scheduled stops here" />
        </Segment>
        <Segment>
          <Header as="h4" icon="sun" content="AM departures" />
          <Grid
            padded
            style={{ fontFeatureSettings: "'tnum' 1" }}
            attached="top"
          >
            {am.map(t => (
              <Grid.Column width={3} textAlign="right" style={{ padding: 0 }}>
                {formatTime(t.arrivalTime, false)}
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
        <Segment>
          <Header as="h4" content="PM departures" />
          <Grid
            padded
            style={{ fontFeatureSettings: "'tnum' 1" }}
            attached="top"
          >
            {pm.map(t => (
              <Grid.Column width={3} textAlign="right" style={{ padding: 0 }}>
                {formatTime(t.arrivalTime, false)}
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
        <Segment>
          <Header as="h4" content="Nighttime departures" />
          <Grid
            padded
            style={{ fontFeatureSettings: "'tnum' 1" }}
            attached="top"
          >
            {nite.map(t => (
              <Grid.Column width={3} textAlign="right" style={{ padding: 0 }}>
                {formatTime(t.arrivalTime, false)}
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
      </Segment.Group>
    </>
  );
};
