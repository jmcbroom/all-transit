import React from "react";
import RouteDisplay from "./RouteDisplay";
import { Grid } from "semantic-ui-react";
export const RouteGrid = ({ routes }) => (<Grid columns={3} divided>
  {routes.map((r, i) => {
    return (<Grid.Column key={r.routeLongName}>
      <RouteDisplay route={r} />
    </Grid.Column>);
  })}
</Grid>);
