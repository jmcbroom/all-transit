import React from "react";
import { graphql } from "gatsby";
import _ from "lodash";
import Layout from "../components/layout";
import { Grid, Image, Header } from "semantic-ui-react";

export default ({ data }) => {
  console.log(data);
  let event = data.allAirtable.edges[0].node;
  return (
    <Layout title={data.Event_name} breadcrumb={true}>
      <Grid padded>
        <Grid.Column width={16}>
          <Header as="h2" content={event.data.Event_name} />
          <Header as="h4" content={event.data.Event_type} icon={event.data.Icon} />
          {event.data.Attachments.length > 0 ? <Image size={`big`} src={event.data.Attachments[0].url} /> : ``}
          <p>{event.data.Description}</p>
          <p>{event.data.Location}</p>
          <p>{event.data.Date_Time}</p>
          <p>{event.data.Duration / 60} minutes long</p>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    allAirtable(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          data {
            Date_Time
            Description
            Duration
            Event_name
            Event_type
            Icon
            Location
            Attachments {
              type
              url
            }
          }
        }
      }
    }
  }
`;
