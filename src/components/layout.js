import React, { useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import SiteHeader from "./SiteHeader";
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

const Layout = ({ title, color, children }) => {
  let [visible, setVisible] = useState(false);

  let appStyle = {
    height: '100vh'
  }

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
        <div style={appStyle}>
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
              <div style={{appStyle}}>
              <SiteHeader siteTitle={title} color={color}>
              <Button
                icon={visible ? "grav" : "grav"}
                onClick={() => setVisible(visible ? false : true)}
                />
              </SiteHeader>
              {children}
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
