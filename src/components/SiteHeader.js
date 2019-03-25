import React from "react";
import { Header } from "semantic-ui-react";

const SiteHeader = ({ siteTitle, color, children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: 5,
      background: color
    }}
  >
    <Header as="h3" content={siteTitle} style={{ margin: 0 }} />
    {children}
  </div>
);

export default SiteHeader;
