import React from "react";
import { Header, List, Message } from "semantic-ui-react";
export const Detour = () => (
  <Message color="red">
    <Header as="h3" icon="warning sign" content="Detours in effect" />
    <List>
      <List.Header>DDOT</List.Header>
      <List.Item>2 Woodward</List.Item>
      <List.Header>SMART</List.Header>
      <List.Header>The Ride</List.Header>
    </List>
  </Message>
);
