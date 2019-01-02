import React from "react";
import { graphql, Link } from "gatsby";
import _ from 'lodash';
import Layout from "../components/layout";
import RouteDisplay from '../components/RouteDisplay';
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

  const panes = [
    { menuItem: 'Fares', render: () => (<Tab.Pane>information</Tab.Pane>) },
    { menuItem: 'Routes', render: () => <Tab.Pane><RouteGrid routes={routes} /></Tab.Pane> },
    { menuItem: 'Map', render: () => <Tab.Pane>map</Tab.Pane> }
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
        }      
      }
    }
  }
`;
