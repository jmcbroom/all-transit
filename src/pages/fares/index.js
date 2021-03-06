import React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import { Segment, Table, Grid, Header, Image } from "semantic-ui-react";

const Fares = ({ data }) => {
  console.log(data);

  let agencies = data.allFaresYaml.edges.map(e => e.node);

  return (
    <Layout title="Fares">
      <Grid columns={2} stretched stackable>
        <Grid.Column width={10}>
          <Segment textAlign="center" vertical>
            <Header as="h3">Pay for the bus with cash.</Header>
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
        {agencies.map(a => (
          <>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="3" style={{ background: "#ddd" }}>
                  {`${a.agency} Fares`}
                </Table.HeaderCell>
              </Table.Row>

              <Table.Row>
                <Table.HeaderCell>Duration</Table.HeaderCell>
                <Table.HeaderCell>Cost</Table.HeaderCell>
                <Table.HeaderCell>Where to buy</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {a.passes.map(p => (
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{p.duration}</Table.Cell>
                  <Table.Cell>{p.cost.regular}</Table.Cell>
                  <Table.Cell>something</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </>
        ))}
      </Table>
    </Layout>
  );
};

export const query = graphql`
  {
    allFaresYaml {
      edges {
        node {
          agency
          passes {
            duration
            cost {
              regular
              reduced
            }
            purchase
          }
        }
      }
    }
  }
`;
export default Fares;
