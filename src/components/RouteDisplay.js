import React from "react";
import { Link } from "gatsby";
import { Header, Label } from "semantic-ui-react";

const RouteDisplay = ({ route, inline }) =>
  inline === false ? (
    <React.Fragment>
      <Header
        as="h4"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Label size="large" color="grey">
          {route.routeShortName}
        </Label>
        <Link to={`${route.agencyId}/route/${route.routeShortName}`}>
          {route.routeLongName}
        </Link>
      </Header>
    </React.Fragment>
  ) : (
    <div style={{ display: "inline-block" }}>
      <Header as="h4">
        <Label
          size="large"
          color={`#${route.routeColor}`}
          style={{ background: `#${route.routeColor}`, opacity: 0.75 }}
        >
          {route.routeShortName}
        </Label>
        <Link
          to={`${route.agencyId}/route/${route.routeShortName}`}
          style={{ marginLeft: ".5rem" }}
        >
          {route.routeLongName}
        </Link>
      </Header>
    </div>
  );

export default RouteDisplay;
