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
    {title: 'Use our trip planner', subtitle: 'Point-by-point, step-by-step directions', slug: 'trip-planner'},
    {title: "Where's my bus?", subtitle: 'Access real-time information', slug: 'trip-planner'},
    {title: "Fares & passes", subtitle: 'Options to pay for your ride', slug: 'trip-planner'},
    {title: "Bus stops", subtitle: 'Find a bus stop near you', slug: 'trip-planner'},
    {title: "Routes & schedules", subtitle: 'explore an individual rollouts', slug: 'trip-planner'},
    {title: "System map", subtitle: 'Get the big picture', slug: 'system-map'},
  ]

  return (
    <Layout title={"Detroit transit guide"}>
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <Message>Scott Benson says: Always wear a bowtie.</Message>
            <Image
              src="https://live.staticflickr.com/65535/47838416632_032324db91_n.jpg"
              size="regular"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Accordion styled>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={() => {
                  setActiveIndex(0);
                }}
              >
                <Icon name="dropdown" />I want to learn the system!
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <List divided>
                  {explainers.map(e => (
                    <List.Item as="a" href={`/help-with/${e.slug}`}>
                      <List.Icon name="arrow right" />
                      <List.Content>
                        <List.Header>{e.title}</List.Header>
                        <List.Description>{e.subtitle}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={() => {
                  setActiveIndex(1);
                }}
              >
                <Icon name="dropdown" />
                I'm ready to ride!
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <List>
                  {ready.map(r => (
                    <List.Item as="a" href={`/${r.slug}`}>
                      <List.Icon name="arrow right" />
                      <List.Content>
                        <List.Header>{r.title}</List.Header>
                        <List.Description>{r.subtitle}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={() => {
                  setActiveIndex(2);
                }}
              >
                <Icon name="dropdown" />
                Community resources!
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <List>
                  {[
                    "Customer Service & Feedback",
                    "Stop & Shelter Requests",
                    "Programs",
                    "Events",
                    "Data",
                    "Title VI",
                    "About Us"
                  ].map(c => (
                    <List.Item>
                      <List.Icon name="arrow right" />
                      <List.Content>
                        <List.Header>{c}</List.Header>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={() => {
                  setActiveIndex(3);
                }}
              >
                <Icon name="dropdown" />
                Go further
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 3}>
                <List>
                  {["Get out of town", "Rent a car", "Ride bike share"].map(
                    c => (
                      <List.Item>
                        <List.Icon name="arrow right" />
                        <List.Content>
                          <List.Header>{c}</List.Header>
                          <List.Description>{c}</List.Description>
                        </List.Content>
                      </List.Item>
                    )
                  )}
                </List>
              </Accordion.Content>
            </Accordion>
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
