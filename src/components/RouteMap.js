import React from "react";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox";
import style from "./style.json";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";

class RouteMap extends React.Component {
  componentDidMount() {
    const shapes = this.props.shapes;
    const stops = this.props.stops;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: style,
      bounds: bbox(shapes[0]),
      minZoom: 8
    });

    this.map.on("load", m => {
      // this.map.fitBounds(bbox(shapes[0]), {
      //   padding: 40
      // });

      this.map.addLayer(
        {
          id: "routes",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: shapes
            }
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": ["get", "color"],
            "line-opacity": 1,
            "line-width": {
              base: 1.5,
              stops: [[8.5, 0.5], [10, 0.75], [18, 26]]
            }
          }
        },
        "road-label-small"
      );
      this.map.addLayer(
        {
          id: "stops",
          type: "circle",
          minzoom: 15,
          source: {
            type: "geojson",
            data: stops
          }
        },
        "road-label-small"
      );
    });
  }

  render() {
    return (
      <div ref={el => (this.mapContainer = el)} style={{ height: "50vh" }} />
    );
  }
}

export default RouteMap;
