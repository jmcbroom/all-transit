import React, { useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql, Link } from "gatsby";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
import "semantic-ui-less/semantic.less";
import {
  Sidebar,
  Button,
  Segment,
  Menu,
  Icon,
  Breadcrumb
} from "semantic-ui-react";

const Layout = ({ title, color, breadcrumb, children }) => {
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
      render={() => (
        <div style={{ height: "100%" }}>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="slide along"
              icon="labeled"
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width="thin"
            >
              <Link to={`/`}>
                <Menu.Item as="a" onClick={() => setVisible(false)}>
                  <Icon name="home" />
                  Home
                </Menu.Item>
              </Link>
              <Link to={`/ddot`}>
                <Menu.Item as="a" onClick={() => setVisible(false)}>
                  <Icon name="home" />
                  DDOT
                </Menu.Item>
              </Link>
              <Link to={`/smart`}>
                <Menu.Item as="a" onClick={() => setVisible(false)}>
                  <Icon name="home" />
                  SMART
                </Menu.Item>
              </Link>
              <Link to={`/the-ride`}>
                <Menu.Item as="a" onClick={() => setVisible(false)}>
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
              <SiteHeader siteTitle={title} color={color}>
                <Button
                  icon={visible ? "window close" : "content"}
                  color="grey"
                  onClick={() => setVisible(visible ? false : true)}
                />
              </SiteHeader>
              {breadcrumb && <Breadcrumb size="small" sections={breadcrumb} />}
              {children}
              <Footer />
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
