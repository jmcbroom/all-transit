import React from "react";
import { Header, Breadcrumb, Segment } from "semantic-ui-react";

const SiteHeader = ({ siteTitle, color, children }) => (
  <>
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
      <Header
        as="h2"
        content={siteTitle}
        style={{ margin: 0, marginLeft: 20 }}
      />
    </div>
  </>
);

export default SiteHeader;
