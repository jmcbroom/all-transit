import React, { useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import SiteHeader from "./SiteHeader";
import "semantic-ui-less/semantic.less";
import { Sticky, Sidebar, Button, Segment, Menu, Icon, Image } from "semantic-ui-react";

let gridStyle = {
  display: "grid",
  gridTemplateRows: `50px minmax(150px, 1fr) 50px 2fr`,
  // gridGap: 10,
  height: "100vh",
  width: "100vw",
  gridTemplateAreas: `"h"
  "m"
  "l"
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
                  <SiteHeader siteTitle={title} color={color}>
                    <Button icon={visible ? "grav" : "grav"} onClick={() => setVisible(visible ? false : true)} />
                  </SiteHeader>
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
