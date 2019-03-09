import React from "react";
import { Link } from "gatsby";
import { Header, Label, Divider, Button } from "semantic-ui-react";

const RouteDisplay = ({ route, background, size }) => {
  if (size === null) {
    size = "large";
  }
  return (
    <Link to={`/${route.agencyId}/route/${route.routeShortName}`}>
      <Button
        size={size}
        inline
        compact
        fluid
        style={{ textAlign: "left", background: background }}
      >
        <Button.Content>
          <Label
            size={size}
            circular
            style={{
              backgroundColor: `#${route.routeColor}`,
              color: `#${route.routeTextColor}`,
              fontWeight: 700,
              fontSize: "1.1em"
            }}
          >
            {route.routeShortName}
          </Label>
          <span style={{ padding: "0px 5px", textAlign: "right" }}>
            {route.routeLongName}
          </span>
        </Button.Content>
      </Button>
    </Link>
  );
};

export default RouteDisplay;
