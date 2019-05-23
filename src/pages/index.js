import React, { useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import {
  Card,
  Header,
  Segment,
  Grid,
  Divider,
  Icon,
  Button,
  Label,
  Dropdown,
  Message,
  Accordion,
  List,
  Image
} from "semantic-ui-react";

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

const IndexPage = ({ data }) => {
  let destinations = data.allDestinationsYaml.edges
    .map(e => e.node)
    .map(n => {
      return {
        key: n.name,
        text: n.name,
        value: n.name,
        icon: "arrow circle right"
      };
    });

  const [activeIndex, setActiveIndex] = useState(0);

  let explainers = data.allExplainersYaml.edges.map(e => e.node);

  const ready = [
    {
      title: "Use our trip planner",
      subtitle: "Point-by-point, step-by-step directions",
      slug: "trip-planner"
    },
    {
      title: "Where's my bus?",
      subtitle: "Access real-time information",
      slug: "trip-planner"
    },
    {
      title: "Fares & passes",
      subtitle: "Options to pay for your ride",
      slug: "trip-planner"
    },
    {
      title: "Bus stops",
      subtitle: "Find a bus stop near you",
      slug: "trip-planner"
    },
    {
      title: "Routes & schedules",
      subtitle: "explore an individual rollouts",
      slug: "trip-planner"
    },
    { title: "System map", subtitle: "Get the big picture", slug: "system-map" }
  ];

  return (
    <Layout title={"Detroit transit guide"}>
      <Grid padded>
        <Grid.Row>
          <Button.Group fluid size="big" widths="seven" centered>
            <Button color="yellow" style={{ color: "#222" }}>
              New to the bus?
            </Button>
            <Button.Or />
            <Button color="green">I'm a rider</Button>
          </Button.Group>
        </Grid.Row>

        <Grid.Row columns={2} divided>
          <Grid.Column>
            <List>
              {explainers.map(e => (
                <List.Item as="a" href={`/help-with/${e.slug}`}>
                  <List.Icon name="angle right" />
                  <List.Content>
                    <List.Header as="a">{e.title}</List.Header>
                    <List.Description>{e.subtitle}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              {ready.map(e => (
                <List.Item as="a" href={`/${e.slug}`}>
                  <List.Icon name="angle right" />
                  <List.Content>
                    <List.Header as="a">{e.title}</List.Header>
                    <List.Description>{e.subtitle}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>

      </Grid>
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
      }
    }
    allDestinationsYaml {
      edges {
        node {
          name
        }
      }
    }
    allExplainersYaml {
      edges {
        node {
          title
          subtitle
          slug
          level
          pages {
            title
            subtitle
            slug
            elements {
              type
              content
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
