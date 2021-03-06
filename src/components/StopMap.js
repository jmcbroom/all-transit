import React from "react";
import mapboxgl from "mapbox-gl";
import style from "./style.json";
import { Sticky } from "semantic-ui-react";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";

class StopMap extends React.Component {
  componentDidMount() {
    const lat = this.props.lat;
    const lon = this.props.lon;
    const routes = this.props.routes;

    let routeFeatures = routes
      .map(r => {
        let route = r.routeByFeedIndexAndRouteId;
        return {
          type: "Feature",
          properties: {
            direction: r.direction,
            routeColor: route.routeColor,
            routeTextColor: route.routeTextColor,
            routeSortOrder: route.routeSortOrder
          },
          ...r.geojson
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

    this.map.addControl(new mapboxgl.FullscreenControl());

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
            "line-color": ["concat", "#", ["get", "routeColor"]],
            "line-opacity": 0.9,
            "line-width": {
              base: 1.5,
              stops: [[8.5, 0.5], [10, 0.75], [18, 26]]
            }
          }
        },
        "road-label-small"
      );
    });
  }

  render() {
    return (
      <Sticky>
        <div
          ref={el => (this.mapContainer = el)}
          style={{ minHeight: "35vh" }}
        />
      </Sticky>
    );
  }
}

export default StopMap;
