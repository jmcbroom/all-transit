import React from 'react';
import mapboxgl from 'mapbox-gl';
import wkx from 'wkx';
import bbox from '@turf/bbox';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg';

class RouteMap extends React.Component {
    componentDidMount() {
        const shapes = this.props.shapes

        const features = shapes.map(s => {
            let wkbBuffer = new Buffer(s.geom, 'hex')
            return {
                type: "Feature",
                properties: {},
                geometry: wkx.Geometry.parse(wkbBuffer).toGeoJSON()
            }
        })

        console.log(features)
        console.log(bbox(features[0]))
    

        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: "mapbox://styles/jayarem/citsyz1z200122ipqldv7ba6y",
          bounds: bbox(features[0]),
          minZoom: 10
        });
    
        this.map.on('load', m => {
            this.map.fitBounds(bbox(features[0]), {
                padding: 40,
            })
            this.map.addLayer({
                "id": "routes",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": features
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

            console.log(m)
        })
      }
    
      render() {
        return (
          <div ref={el => this.mapContainer = el} style={{height: '50vh'}}/>
        )
      }
}

export default RouteMap;