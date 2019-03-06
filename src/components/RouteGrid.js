import React from "react";
import RouteDisplay from "./RouteDisplay";
import { List } from "semantic-ui-react";

export const RouteGrid = ({ routes }) => (
  <List divided>
    {routes.map((r, i) => {
      return (
        <List.Item key={r.routeLongName}>
          <RouteDisplay route={r} />
        </List.Item>
      );
    })}
  </List>
);
