import React, { useState } from "react";
import { Header, Icon, List } from "semantic-ui-react";

const SiteHeader = ({ siteTitle, children }) => {
  const headerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "rgba(106, 170, 88, 0.5)",
    width: "100%",
    padding: 20
  };

  const siteTitleStyle = { margin: 0, marginLeft: 20 };

  return (
    <div style={headerStyle}>
      {children}
      <Header as="h2" content={siteTitle} style={siteTitleStyle} />
    </div>
  );
};

export default SiteHeader;
