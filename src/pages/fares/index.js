import React from "react";
import { Link } from "gatsby";

import Layout from "../../components/layout";
import { Segment, Table, Icon, Grid, Header, Image } from "semantic-ui-react";

const Fares = ({ data }) => {

  let agency = 'whatever'
  return (
    <Layout title="Fares">
      <Grid columns={2} stretched stackable>
        <Grid.Column width={10}>
          <Segment textAlign="center" vertical>
            <Header as="h3">Pay for the bus, ya Lucas animal.</Header>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Image
            src="http://www.vta.org/sfc/servlet.shepherd/document/download/069A0000001EJfwIAG"
            small
          />
        </Grid.Column>
      </Grid>
      <Table celled striped stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell as="h4" colSpan="3">
              DDOT Fares
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Where to buy</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>4 hour pass</Table.Cell>
            <Table.Cell collapsing>$2.00 regular / $1.00 reduced</Table.Cell>
            <Table.Cell collapsing>
              <Icon name="bus" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>24 hour pass</Table.Cell>
            <Table.Cell collapsing>$2.00</Table.Cell>
            <Table.Cell collapsing>
              <Icon name="bus" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>7 day pass</Table.Cell>
            <Table.Cell collapsing>$2.00</Table.Cell>
            <Table.Cell collapsing>
              <Icon name="bus" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>31 day pass</Table.Cell>
            <Table.Cell collapsing>$2.00</Table.Cell>
            <Table.Cell collapsing>
              <Icon name="bus" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Layout>
  );
};

export const query = graphql`
  {
    postgres {
      agencies: allAgenciesList {
        agencyId
        agencyName
        agencyLongName
        agencyUrl
        agencyFareUrl
        routes: routesByFeedIndexAndAgencyIdList {
          agencyId
          routeShortName
          routeLongName
          routeDesc
          routeType
          routeUrl
          routeColor
          routeTextColor
          routeSortOrder
          shapes: routeShapesByFeedIndexAndRouteIdList {
            dir
            direction
            geojson
          }
        }
      }
    }
  }
`;
export default Fares;
