import React from "react";
import { Label } from "semantic-ui-react";

const RouteBadge = ({ route, size }) => {
  return (
    <Label
      size={size}
      horizontal
      style={{
        backgroundColor: `#${route.routeColor}`,
        color: `#${route.routeTextColor}`
      }}
    >
      {route.routeShortName}
    </Label>
  );
};

export default RouteBadge;
