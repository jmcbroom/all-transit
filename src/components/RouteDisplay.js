import React from "react";
import { Link } from "gatsby";
import { Label, Button } from "semantic-ui-react";

const RouteDisplay = ({ route, background, size, asLink }) => {
  if (size === null) {
    size = "large";
  }
  const button =
      (<Button
        size='regular'
        compact
        fluid
        style={{ textAlign: "left", background: background, padding: 0 }}
      >
        <Button.Content>
          <Label
            size={size}
            style={{
              backgroundColor: `#${route.routeColor}`,
              color: `#${route.routeTextColor}`,
              fontWeight: 700,
              fontSize: "1.1em",
              width: 40,
              textAlign: 'center',
              padding: '8px 0px'
            }}
          >
            {route.routeShortName}
          </Label>
          <span style={{ padding: "0px 5px", textAlign: "right" }}>
            {route.routeLongName}
          </span>
        </Button.Content>
      </Button>)
    if (asLink) {
      return (
        <Link
          prefetch={false}
          to={`/${route.agencyId}/route/${route.routeShortName}`}
        >
          {button}
        </Link>
      )
    }
    else { return button }
  ;
};

export default RouteDisplay;
