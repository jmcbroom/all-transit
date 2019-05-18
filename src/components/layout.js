import React, { useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql, Link } from "gatsby";
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

  let appStyle = {};

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
              width="wide"
            >
              <Link to={`/`}>
                <Menu.Item as="a">
                  <Icon name="home" />
                  Home
                </Menu.Item>
              </Link>
              <Link to={`/ddot`}>
                <Menu.Item as="a">
                  <Icon name="home" />
                  DDOT
                </Menu.Item>
              </Link>
              <Link to={`/smart`}>
                <Menu.Item as="a">
                  <Icon name="home" />
                  SMART
                </Menu.Item>
              </Link>
              <Link to={`/the-ride`}>
                <Menu.Item as="a">
                  <Icon name="home" />
                  Ann Arbor
                </Menu.Item>
              </Link>
              <Link to={`/transit-windsor`}>
                <Menu.Item as="a">
                  <Icon name="home" />
                  Windsor
                </Menu.Item>
              </Link>
            </Sidebar>

            <Sidebar.Pusher>
              <div style={{ appStyle }}>
                <SiteHeader siteTitle={title} color={color}>
                  <Button
                    icon={visible ? "grav" : "grav"}
                    onClick={() => setVisible(visible ? false : true)}
                  />
                </SiteHeader>
                <div style={{ padding: 10 }}>{children}</div>
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
