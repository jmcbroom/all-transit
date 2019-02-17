import React from "react";
import mapboxgl from "mapbox-gl";
import wkx from "wkx";
import style from "./style.json";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";

class StopMap extends React.Component {
  componentDidMount() {
    const lat = this.props.lat;
    const lon = this.props.lon;
    const routes = this.props.routes;

    let routeFeatures = routes
      .map(r => {
        let wkbBuffer = new Buffer(r.geom, "hex");

        return {
          type: "Feature",
          properties: {
            direction: r.direction,
            ...r.routeByFeedIndexAndRouteId
          },
          geometry: wkx.Geometry.parse(wkbBuffer).toGeoJSON()
        };
      })
      .sort((a, b) => a.properties.order < b.properties.order);

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: style,
      center: [lon, lat],
      zoom: 17.5,
      minZoom: 10
    });

    this.map.on("load", m => {
      this.map.addLayer(
        {
          id: "routes",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: routeFeatures
            }
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "green",
            "line-opacity": 0.5,
            "line-width": 3
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

export default StopMap;
