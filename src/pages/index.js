import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import { Card, List, Message, Segment, Header } from "semantic-ui-react";
import AllAgencyMap from "../components/AllAgencyMap";

const agencies = {
  ddot: {
    color: "rgba(0, 68, 69, 0.5)",
    description: "Detroit"
  },
  smart: {
    color: "rgba(170, 22, 0, 0.5)",
    description: "Suburbs, downtown & DTW"
  },
  "the-ride": {
    color: "rgba(4, 50, 124, 0.5)",
    description: "Ann Arbor & Ypsilanti"
  },
  "transit-windsor": {
    color: "rgba(0, 157, 211, 0.5)",
    description: "Windsor & downtown Detroit"
  }
};

const IndexPage = ({ data }) => (
  <Layout title={"Welcome"}>
    <AllAgencyMap agencies={data.postgres.agencies} />

    <div style={{ gridArea: "i" }}>
      <Card.Group itemsPerRow={4} stackable>
        {data.postgres.agencies.map(a => (
          <Card key={a.agencyId}>
            <Card.Content
              style={{
                background: agencies[a.agencyId].color,
                backgroundOpacity: 0.1
              }}
            >
              <Card.Header as="a" href={`/${a.agencyId}`}>
                {a.agencyName}
              </Card.Header>
              <Card.Meta>{agencies[a.agencyId].description}</Card.Meta>
            </Card.Content>
            {/* <Card.Content extra>
              <List>
                <List.Item
                  as="a"
                  href={a.agencyUrl}
                  icon="linkify"
                  content="Website"
                />
                <List.Item
                  as="a"
                  href={a.agencyFareUrl}
                  icon="ticket"
                  content="Fares/Passes"
                />
              </List>
            </Card.Content> */}
          </Card>
        ))}
      </Card.Group>
    </div>
  </Layout>
);

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
export default IndexPage;
