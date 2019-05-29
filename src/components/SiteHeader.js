import React, { useState } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import { Detour } from "./Detour";

let languages = {
  EN: "English (US)",
  ES: "Spanish",
  AR: "Arabic",
  FR: "French",
  BN: "Bengali"
};

const SiteHeader = ({ siteTitle, children }) => {

  return (
  <>
    <Detour />
    <div style={{padding: 5, textAlign: 'right', background: "rgba(106, 170, 88, 0.4)"}}>
      <List horizontal>
        <List.Item><Icon name='talk' size="regular" /></List.Item>
        {Object.keys(languages).map(l => (
          <List.Item>{l}</List.Item>
        // <List.Item><Flag name={l} size="large" style={{fontSize: '1.5em'}} /></List.Item>
        ))}
      </List>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: "rgba(106, 170, 88, 0.5)",
        width: "100%",
        padding: 20
      }}
    >
      {children}
      <Header as="h2" content={siteTitle} style={{margin: 0, marginLeft: 20}}/>
    </div>
  </>
)};

export default SiteHeader;
