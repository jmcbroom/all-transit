import React from "react";
import mapboxgl from "mapbox-gl";
import wkx from "wkx";
import bbox from "@turf/bbox";
import style from "./style.json";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";

class RouteMap extends React.Component {
  componentDidMount() {
    const shapes = this.props.shapes;

    console.log(shapes);
    console.log(bbox(shapes[0]));

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: style,
      bounds: bbox(shapes[0]),
      minZoom: 10
    });

    this.map.on("load", m => {
      this.map.fitBounds(bbox(shapes[0]), {
        padding: 40
      });

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
            "line-color": `#${shapes[0].properties.color}`,
            "line-opacity": 1,
            "line-width": ["/", ["get", "order"], 10]
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

export default RouteMap;
