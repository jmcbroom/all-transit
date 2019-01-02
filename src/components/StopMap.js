import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiamF5YXJlbSIsImEiOiIySy1JZEg0In0.miYH5WbQqmrF_97xiAaFsg';

class StopMap extends React.Component {
    componentDidMount() {
        const lat = this.props.lat
        const lon = this.props.lon

        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: "mapbox://styles/jayarem/citsyz1z200122ipqldv7ba6y",
          center: [lon, lat],
          zoom: 17.5,
          minZoom: 10
        });
    
        this.map.on('load', m => {
            console.log(m)
        })
      }
    
      render() {
        return (
          <div ref={el => this.mapContainer = el} style={{height: '50vh'}} />
        )
      }
}

export default StopMap;