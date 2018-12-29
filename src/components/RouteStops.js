import React from "react";
import { Link } from "gatsby";

class RouteStops extends React.Component {
  render() {
    let stops = this.props.stops[0].stopTimes.map(st => st.stop);
    return (
      <ul>
        {stops.map(s => (
          <Link to={`${this.props.agency}/stop/${s.stopId}`}>
            <li>{s.stopName} / {s.stopDesc}</li>
          </Link>
        ))}
      </ul>
    );
  }
}

export default RouteStops;
