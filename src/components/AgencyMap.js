import React from "react";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox";
import style from "./style.json";
import "mapbox-gl/dist/mapbox-gl.css";
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

    this.map.addControl(new mapboxgl.FullscreenControl());

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    this.map.on("load", m => {
      this.map.fitBounds(bbox(routes), {
        padding: 20
      });
      console.log(routes);
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
          id: "routes-all-labels",
          type: "symbol",
          source: {
            type: "geojson",
            data: routes
          },
          minzoom: 12.25,
          layout: {
            "symbol-placement": "line",
            "text-field": ["get", "short"],
            "text-font": ["Inter Extra Bold"],
            "text-line-height": 12,
            "symbol-spacing": 250,
            "text-rotation-alignment": "viewport",
            "icon-image": ["get", "agency"],
            "icon-rotation-alignment": "viewport",
            "icon-text-fit": "width",
            "icon-text-fit-padding": [4, 8, 2, 8],
            "text-size": 12,
            "text-allow-overlap": true
          },
          paint: {
            "text-color": ["get", "color"]
          }
        },
        "road-label-small"
      );
      // this.map.addLayer(
      //   {
      //     id: "routes-important-labels",
      //     type: "symbol",
      //     source: {
      //       type: "geojson",
      //       data: routes
      //     },
      //     minzoom: 10,
      //     filter: ["==", "order", 1],
      //     layout: {
      //       "symbol-placement": "line",
      //       "text-field": ["get", "short"],
      //       "text-font": ["Inter Extra Bold"],
      //       "text-line-height": 12,
      //       "text-rotation-alignment": "viewport",
      //       "icon-image": ["get", "agency"],
      //       "icon-rotation-alignment": "viewport",
      //       "icon-text-fit": "width",
      //       "symbol-spacing": 250,
      //       "icon-text-fit-padding": [6, 10, 4, 10],
      //       "text-size": 14,
      //       "text-allow-overlap": true
      //     },
      //     paint: {
      //       "text-color": ["get", "color"]
      //     }
      //   },
      //   "road-label-small"
      // );

      this.map.on("click", "routes-all-labels", e => {
        console.log(e);
      });
    });
  }

  render() {
    return (
      <div ref={el => (this.mapContainer = el)} style={{ height: "60vh" }} />
    );
  }
}

export default AgencyMap;
