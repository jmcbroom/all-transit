import React from "react";
import { Message, Icon } from "semantic-ui-react";
export const Detour = () => (
  <Message color="red" size='small' icon={<Icon name='warning sign' size="small"/>} content="Detours in effect" attached='top'>
  </Message>
);
