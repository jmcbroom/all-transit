import React from 'react';
import mapboxgl from 'mapbox-gl';
import wkx from 'wkx';
import bbox from '@turf/bbox';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg';

class AgencyMap extends React.Component {
    componentDidMount() {
        const routes = this.props.routeFeatures

        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: "mapbox://styles/jayarem/citsyz1z200122ipqldv7ba6y",
          bounds: bbox(routes),
          minZoom: 10
        });
    
        this.map.on('load', m => {
            this.map.fitBounds(bbox(routes), {
                padding: 40,
            })
            this.map.addLayer({
                "id": "routes",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": routes
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

export default AgencyMap;