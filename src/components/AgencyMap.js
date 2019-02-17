import React from "react";
import mapboxgl from "mapbox-gl";
import wkx from "wkx";
import bbox from "@turf/bbox";
import style from "./style.json";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";
class AgencyMap extends React.Component {
  componentDidMount() {
    const routes = this.props.routeFeatures;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: style,
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
            "line-opacity": 0.85,
            "line-width": {
              base: 1.5,
              stops: [[8.5, 0.5], [10, 0.75], [18, 26]]
            }
            // "line-width": ["*", ["/", 3, ["get", "order"]], 3]
          }
        },
        "road-label-small"
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
