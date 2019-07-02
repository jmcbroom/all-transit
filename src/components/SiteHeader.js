import React from "react";
import { Image } from "semantic-ui-react";

const SiteHeader = ({ children }) => {
  const headerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#A0D5B3",
    width: "100%",
    padding: "25px 25px 0px 25px"
  };

  const tagStyle = {
    paddingLeft: 15,
    display: "inline-block",
    maxWidth: 80,
    fontWeight: 700,
    paddingTop: 15
  };

  return (
    <div style={headerStyle}>
      <div>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Ddot-logo.svg"
          padded
          inline
          style={{
            marginBottom: 15,
            borderRight: "3px solid rgba(0,0,0,0.2)",
            paddingRight: 15
          }}
          size="tiny"
        />
        <div style={tagStyle}>Detroit's Transit System</div>
      </div>
      {/* <Message content="detroit's transit system" style={{borderLeft: '2px solid black'}} /> */}
      {children}
    </div>
  );
};

export default SiteHeader;
