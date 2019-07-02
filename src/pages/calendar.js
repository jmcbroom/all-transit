import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import { Header, Segment, Grid } from "semantic-ui-react";

const Calendar = ({ data }) => (
  <Layout title={"Calendar"}>
    <Grid>
      <Grid.Column width={16}>
        <Segment.Group>
          {data.allAirtable.edges
            .map(e => e.node)
            .map(n => (
              <Segment>
                <Link to={`/event/${n.id}`}>
                  <Header as="h3" content={n.data.Event_name} icon={n.data.Icon} subheader={n.data.Event_type} />
                </Link>
                <Header as="h4" content={n.data.Date_Time} icon={`calendar`} />
              </Segment>
            ))}
        </Segment.Group>
      </Grid.Column>
    </Grid>
  </Layout>
);

export const query = graphql`
  {
    allAirtable {
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
export default Calendar;
