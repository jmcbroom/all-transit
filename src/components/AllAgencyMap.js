import React from "react";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox";
import style from "./style.json";
import wkx from 'wkx';

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";

class AllAgencyMap extends React.Component {
  componentDidMount() {
    const agencies = this.props.agencies

    // map through agencies => routes => shapes to generate a long list of features
    let routeShapes = agencies.map(a => {
      let routes = a.routes.map(r => {
        let m = r.shapes.map(rs => {
          let wkb = new Buffer(rs.geom, 'hex')
          return {
            type: "Feature",
            properties: {
              dir: rs.direction,
              color: `#${r.routeColor}`,
              textColor: `#${r.routeTextColor}`,
              order: r.routeSortOrder,
              short: r.routeShortName,
              long: r.routeLongName
            },
            geometry: wkx.Geometry.parse(wkb).toGeoJSON()
          };
        })
        return m;
      }).reduce((a, c) => a.concat(c), []);
      return routes;
    }).reduce((a, c) => a.concat(c), [])

    let routes = {
      "type": "FeatureCollection",
      "features": routeShapes
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: style,
      bounds: bbox(routes),
      minZoom: 7
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
            "line-width": {
              base: 1.5,
              stops: [[8.5, 0.5], [10, 0.75], [18, 26]]
            }
            // "line-width": ["*", ["/", 3, ["get", "order"]], 3]
          }
        },
        "road-label-small"
      );
    });
  }

  render() {
    return (
      <div ref={el => (this.mapContainer = el)} style={{ height: "60vh", margin: "10px 0px" }} />
    );
  }
}

export default AllAgencyMap;
