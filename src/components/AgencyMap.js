import React from "react";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox";
import style from "./style.json";
import "mapbox-gl/dist/mapbox-gl.css";
import _ from "lodash";
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";

class AgencyMap extends React.Component {
  componentDidMount() {
    const routes = this.props.routeFeatures;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: style,
      bounds: bbox(routes),
      minZoom: 7
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    this.map.addControl(new mapboxgl.FullscreenControl());

    this.map.on("load", () => {
      this.map.fitBounds(bbox(routes), {
        padding: 20
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
            "line-color": ["concat", "#", ["get", "routeColor"]],
            "line-opacity": 1,
            "line-width": {
              base: 1.5,
              stops: [[8.5, 0.5], [10, 0.75], [18, 26]]
            }
          }
        },
        "road-label-small"
      );
      // this.map.addLayer(
      //   {
      //     id: "routes-all-labels",
      //     type: "symbol",
      //     source: {
      //       type: "geojson",
      //       data: routes
      //     },
      //     filter: ["in", "routeSortOrder", 2, 3],
      //     minzoom: 12.25,
      //     layout: {
      //       "symbol-placement": "line",
      //       "text-field": ["get", "routeShortName"],
      //       "text-font": ["Inter Extra Bold"],
      //       "text-line-height": 12,
      //       "symbol-spacing": 250,
      //       "text-rotation-alignment": "viewport",
      //       "icon-image": ["get", "agencyId"],
      //       "icon-rotation-alignment": "viewport",
      //       "icon-text-fit": "width",
      //       "icon-text-fit-padding": [4, 8, 2, 8],
      //       "text-size": 12,
      //       "text-allow-overlap": true
      //     },
      //     paint: {
      //       "text-color": ["concat", "#", ["get", "routeColor"]],
      //       "text-halo-color": ["concat", "#", ["get", "routeTextColor"]],
      //       "text-halo-width": 2
      //     }
      //   },
      //   "road-label-small"
      // );
      // this.map.addLayer(
      //   {
      //     id: "routes-important-labels",
      //     type: "symbol",
      //     source: {
      //       type: "geojson",
      //       data: routes
      //     },
      //     minzoom: 8,
      //     filter: ["==", "routeSortOrder", 1],
      //     layout: {
      //       "symbol-placement": "line",
      //       "text-field": ["get", "routeShortName"],
      //       "text-font": ["Inter Extra Bold"],
      //       "text-line-height": 12,
      //       "text-rotation-alignment": "viewport",
      //       "icon-image": ["get", "agencyId"],
      //       "icon-rotation-alignment": "viewport",
      //       "icon-text-fit": "width",
      //       "symbol-spacing": 250,
      //       "icon-text-fit-padding": [6, 10, 4, 10],
      //       "text-size": 14,
      //       "text-allow-overlap": true
      //     },
      //     paint: {
      //       "text-color": ["concat", "#", ["get", "routeColor"]],
      //       "text-halo-color": ["concat", "#", ["get", "routeTextColor"]],
      //       "text-halo-width": 4
      //     }
      //   },
      //   "road-label-small"
      // );
    });
  }

  render() {
    return (
      <div ref={el => (this.mapContainer = el)} style={{ height: "50vh" }} />
    );
  }
}

export default AgencyMap;
