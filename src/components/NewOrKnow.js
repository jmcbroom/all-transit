import React from "react";

import { Grid, Button, List } from "semantic-ui-react";

const NewOrKnow = ({ explainers }) => {
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
    <Grid padded>
      <Grid.Row>
        <Button.Group fluid size="big" widths="seven" centered>
          <Button color="yellow" style={{ color: "#222" }}>
            Learn the system
          </Button>
          <Button.Or />
          <Button color="green">I'm ready to ride</Button>
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
  );
};

export default NewOrKnow;
