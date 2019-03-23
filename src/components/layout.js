import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "./header";
import "semantic-ui-less/semantic.less";

const Layout = ({ title, color, children }) => (
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
        <Header
          siteTitle={`${data.site.siteMetadata.title}`}
          color={color || "rebeccapurple"}
        />
        <div
          style={{
            margin: "0 auto",
            maxWidth: 960,
            padding: "0px .54rem .725rem",
            paddingTop: 0
          }}
        >
          {children}
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
