import React, { useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql, Link } from "gatsby";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
import "semantic-ui-less/semantic.less";
import { Sidebar, Button, Segment, Menu, Icon, List } from "semantic-ui-react";
import { Detour } from "./Detour";

let languages = {
  EN: "English (US)",
  ES: "Spanish",
  AR: "Arabic",
  FR: "French",
  BN: "Bengali"
};

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
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          <div style={{ maxWidth: 1080 }}>
            <Sidebar.Pushable as={Segment}>
              <Sidebar as={Menu} animation="overlay" icon="labeled" onHide={() => setVisible(false)} vertical visible={visible} width="thin">
                <Link to={`/`}>
                  <Menu.Item as="a" onClick={() => setVisible(false)}>
                    <Icon name="home" />
                    Home
                  </Menu.Item>
                </Link>
                <Link to={`/ddot`}>
                  <Menu.Item as="a" onClick={() => setVisible(false)}>
                    <Icon name="home" />
                    Plan a trip
                  </Menu.Item>
                </Link>
                <Link to={`/smart`}>
                  <Menu.Item as="a" onClick={() => setVisible(false)}>
                    <Icon name="home" />
                    Routes
                  </Menu.Item>
                </Link>
                <Link to={`/smart`}>
                  <Menu.Item as="a" onClick={() => setVisible(false)}>
                    <Icon name="home" />
                    Fares/Passes
                  </Menu.Item>
                </Link>
                <Link to={`/smart`}>
                  <Menu.Item as="a" onClick={() => setVisible(false)}>
                    <Icon name="home" />
                    Feedback
                  </Menu.Item>
                </Link>
              </Sidebar>

              <Sidebar.Pusher>
                <Segment.Group horizontal basic size="mini" attached="bottom" style={{ padding: 0, margin: 0 }}>
                  <Detour />
                  <Segment textAlign="right" basic>
                    <List horizontal>
                      <List.Item>
                        <Icon name="talk" size="regular" />
                      </List.Item>
                      {Object.keys(languages).map(l => (
                        <List.Item>{l}</List.Item>
                      ))}
                    </List>
                  </Segment>
                </Segment.Group>
                <SiteHeader siteTitle={title} color={color}>
                  <Button
                    style={{ marginTop: "-35px" }}
                    floated="right"
                    size="medium"
                    icon={visible ? "window close" : "content"}
                    basic
                    onClick={() => setVisible(visible ? false : true)}
                  />
                </SiteHeader>
                {children}
                <Footer />
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </div>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
