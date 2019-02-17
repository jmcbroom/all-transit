import React from "react";
import mapboxgl from "mapbox-gl";
import wkx from "wkx";
import bbox from "@turf/bbox";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";

class RouteMap extends React.Component {
  componentDidMount() {
    const shapes = this.props.shapes;

    console.log(shapes);
    console.log(bbox(shapes[0]));

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/jmcbroom/cj7vfzaa231c02spklbu7bn1z",
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

export default RouteMap;
