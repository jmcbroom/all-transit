import React from "react";
import { graphql, Link } from "gatsby";
import _ from 'lodash';
import wkx from 'wkx';
import Layout from "../components/layout";
import RouteDisplay from '../components/RouteDisplay';
import AgencyMap from '../components/AgencyMap';
import { Tab, Grid, Label, Header } from "semantic-ui-react";


const RouteGrid = ({ routes }) => (
  <Grid columns={3} divided>
    {routes.map((r, i) => {
      return (
        <Grid.Column><RouteDisplay route={r} /></Grid.Column>
        )
    }
    )}
  </Grid>
)

export default ({ data }) => {
  const a = data.postgres.agency[0];
  console.log(a.routes)

  const routes = _.uniqBy(a.routes, 'routeLongName')
  console.log(routes)

  const routeShapes = routes.map(r => {
    let m = r.shapes.map(rs => {
      let wkbBuffer = new Buffer(rs.geom, 'hex')
      return {
        type: "Feature",
        properties: {
          "dir": rs.dir,
          "long": r.routeLongName,
          "short": r.routeShortName
        },
        geometry: wkx.Geometry.parse(wkbBuffer).toGeoJSON()
      }
    })
    return m;
  }).reduce((a, c) => a.concat(c), [])

  const routeFeatures = {
    "type": "FeatureCollection",
    "features": routeShapes
  }

  const panes = [
    { menuItem: 'Map', render: () => <Tab.Pane><AgencyMap routeFeatures={routeFeatures} /></Tab.Pane> },
    { menuItem: 'Fares', render: () => (<Tab.Pane>information</Tab.Pane>) },
    { menuItem: 'Routes', render: () => <Tab.Pane><RouteGrid routes={routes} /></Tab.Pane> }
  ]

  return (
    <Layout>
      <div>
        <h1>{a.agencyName}</h1>
        <Tab menu={{attached: false}} panes={panes} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    postgres {
      agency: allAgenciesList(condition: {agencyId: $id}) {
        agencyName
        routes: routesByFeedIndexAndAgencyIdList{
            routeLongName
            routeShortName
            routeColor
            routeTextColor
            feedIndex
            agencyId
            shapes: routeShapesByFeedIndexAndRouteIdList {
              direction
          	  geom
          	}
        }      
      }
    }
  }
`;
