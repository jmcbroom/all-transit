import React from 'react';
import mapboxgl from 'mapbox-gl';
import wkx from 'wkx';

mapboxgl.accessToken = 'pk.eyJ1IjoiamF5YXJlbSIsImEiOiIySy1JZEg0In0.miYH5WbQqmrF_97xiAaFsg';

class StopMap extends React.Component {
    componentDidMount() {
        const lat = this.props.lat
        const lon = this.props.lon        
        const routes = this.props.routes

        let routeFeatures = routes.map(r => {
          let wkbBuffer = new Buffer(r.geom, 'hex')

          return {
            "type": "Feature",
            "properties": {
              "direction": r.direction,
              ...r.routeByFeedIndexAndRouteId,
            },
            "geometry": wkx.Geometry.parse(wkbBuffer).toGeoJSON()
          }
        })

        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: "mapbox://styles/jayarem/citsyz1z200122ipqldv7ba6y",
          center: [lon, lat],
          zoom: 17.5,
          minZoom: 10
        });
    
        this.map.on('load', m => {
          this.map.addLayer({
            "id": "routes",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": routeFeatures
                  }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
                },
            "paint": {
                "line-color": "green",
                "line-opacity": 0.5,
                "line-width": 3
            }
        }, 'road-label-large')
        })
      }
    
      render() {
        return (
          <div ref={el => this.mapContainer = el} style={{height: '50vh'}} />
        )
      }
}

export default StopMap;