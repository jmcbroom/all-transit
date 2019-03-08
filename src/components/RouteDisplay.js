import React from "react";
import { Link } from "gatsby";
import { Header, Label, Divider } from "semantic-ui-react";

const RouteDisplay = ({ route }) => (
  <Link to={`/${route.agencyId}/route/${route.routeShortName}`}>
    <Label size="large" inline>
      <Label
        size="large"
        style={{
          backgroundColor: `#${route.routeColor}`,
          color: `#${route.routeTextColor}`,
          fontWeight: 700,
          fontSize: "1.1em"
        }}
      >
        {route.routeShortName}
      </Label>
      <span style={{ padding: "0px 5px" }}>{route.routeLongName}</span>
    </Label>
  </Link>
);

export default RouteDisplay;
