import React from 'react';
import _ from 'lodash';
import RouteDisplay from './RouteDisplay';
import { Header } from 'semantic-ui-react';

const StopInfo = ({ stop }) => {

  let uniqRoutes = _.uniqBy(stop.times, t => {
    return t.trip.route.routeLongName
  }).map(ur => ur.trip.route)

  const routeGridStyle = {
    display: 'grid', 
    gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`, 
    gridGap: '1rem',
    margin: '1em 0 1em 0'
  }

  return (
    <div>
      <Header as='h4'>Routes that stop here: </Header>
      <div style={routeGridStyle}>
        {uniqRoutes.map(ur => (
          <RouteDisplay route={ur} />
        ))}
      </div>
    </div>
  )
}

export default StopInfo;