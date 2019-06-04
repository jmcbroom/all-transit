import React from "react";
import _ from 'lodash';
import { Grid, Button, List } from "semantic-ui-react";
import './neworknow.css'

const NewOrKnow = ({ explainers }) => {
  const ready = [
    {
      title: "Real-Time info",
      subtitle: "Access real-time information",
      slug: "trip-planner",
      icon: "bus"
    },
    {
      title: "Use our trip planner",
      subtitle: "Point-by-point, step-by-step directions",
      slug: "trip-planner",
      icon: "pencil alternate"
    },
    { 
      title: "System map", 
      subtitle: "Get the big picture", 
      slug: "system-map", 
      icon: "map outline"  
    },
    {
      title: "Routes & schedules",
      subtitle: "explore an individual rollouts",
      slug: "trip-planner",
      icon: "clock outline"
    },
    {
      title: "Bus stops",
      subtitle: "Find a bus stop near you",
      slug: "trip-planner",
      icon: "map signs"
    },
    {
      title: "Fares & passes",
      subtitle: "Options to pay for your ride",
      slug: "trip-planner",
      icon: "credit card outline"
    }
  ];
  
  return (
    <Grid padded>
      <Grid.Row >
          <Button.Group fluid size="big" widths="seven" centered>
          <Button basic color='green' style={{ cursor: "auto" }}>
            {_.upperCase("Catch your bus")}
          </Button>
          <Button.Or />
          <Button basic color='yellow' style={{ cursor: "auto" }}>
            {_.upperCase("Learn the system")}
          </Button>
        </Button.Group>
      </Grid.Row>

      <Grid.Row columns={2} divided>
        <Grid.Column>
          <List size='huge' divided relaxed>
            {ready.map(e => (
              <List.Item as="a" href={`/${e.slug}`} fluid>
                <List.Icon name={e.icon} style={{ color: '#ccc', width: 30 }} />
                <List.Content>
                  <List.Header as="a">{e.title.split(' ').map(_.capitalize).join(' ')}</List.Header>
                  {/* <List.Description>{e.subtitle}</List.Description> */}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column>
          <List divided size='big' relaxed='very'>
            {explainers.sort((a, b) => { return a.level > b.level }).map(e => (
              <List.Item as="a" href={`/help-with/${e.slug}`}>
                <List.Icon name="help circle" style={{ color: '#ccc' }}/>
                <List.Content>
                  <List.Header as="a">{e.title}</List.Header>
                  <List.Description style={{fontSize: '0.85em', color: '#555'}}>{e.subtitle}</List.Description>
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
