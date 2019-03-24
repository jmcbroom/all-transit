import React, { useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "./header";
import "semantic-ui-less/semantic.less";
import {
  Sticky,
  Sidebar,
  Button,
  Segment,
  Menu,
  Icon,
  Image
} from "semantic-ui-react";

let gridStyle = {
  display: "grid",
  gridTemplateRows: `30px 120px 1fr 60px`,
  // gridGap: 10,
  height: "100vh",
  width: "100vw",
  gridTemplateAreas: `"h"
  "m"
  "i"
  "i"`
};

const Layout = ({ title, color, children }) => {
  let [visible, setVisible] = useState(false);

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              // onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width="thin"
            >
              <Menu.Item as="a">
                <Icon name="home" />
                Home
              </Menu.Item>
              <Menu.Item as="a">
                <Icon name="gamepad" />
                Games
              </Menu.Item>
              <Menu.Item as="a">
                <Icon name="camera" />
                Channels
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
              <div style={gridStyle}>
                <div
                  style={{
                    gridArea: "h",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <Header siteTitle={title}>
                    <Button
                      icon={visible ? "close" : "sidebar"}
                      onClick={() => setVisible(visible ? false : true)}
                    />
                  </Header>
                </div>
                {children}
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
