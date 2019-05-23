import React from "react";
import { Header } from "semantic-ui-react";

const SiteHeader = ({ siteTitle, color, children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: 'rgba(106, 170, 88, 0.25)',
      width: "100%",
      padding: 10,
      background: color
    }}
  >
    <Header as="h2" content={siteTitle} style={{ margin: 0 }} />
    {children}
  </div>
);

export default SiteHeader;
