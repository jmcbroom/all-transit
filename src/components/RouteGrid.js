import React from "react";
import RouteDisplay from "./RouteDisplay";
import { List, Grid } from "semantic-ui-react";

export const RouteGrid = ({ routes }) => (
  <Grid columns={3} stackable>
    {routes.map((r, i) => {
      return (
        <Grid.Column key={r.routeLongName} style={{ padding: ".25rem .25rem" }}>
          <RouteDisplay route={r} />
        </Grid.Column>
      );
    })}
  </Grid>
);
