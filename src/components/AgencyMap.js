import React from "react";
import mapboxgl from "mapbox-gl";
import wkx from "wkx";
import bbox from "@turf/bbox";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";
class AgencyMap extends React.Component {
  componentDidMount() {
    const routes = this.props.routeFeatures;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/jmcbroom/cj7vfzaa231c02spklbu7bn1z",
      bounds: bbox(routes),
      minZoom: 10
    });

    this.map.on("load", m => {
      this.map.fitBounds(bbox(routes), {
        padding: 40
      });
      this.map.addLayer(
        {
          id: "routes",
          type: "line",
          source: {
            type: "geojson",
            data: routes
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": ["get", "color"],
            "line-opacity": 1,
            "line-width": 2
            // "line-width": ["*", ["/", 3, ["get", "order"]], 3]
          }
        },
        "road-label-large"
      );

      console.log(m);
    });
  }

  render() {
    return (
      <div ref={el => (this.mapContainer = el)} style={{ height: "50vh" }} />
    );
  }
}

export default AgencyMap;
