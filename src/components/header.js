import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Button } from "semantic-ui-react";

const Header = ({ siteTitle, color, children }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    {children}
    <h3 style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          color: "black",
          textDecoration: "none"
        }}
      >
        {siteTitle}
      </Link>
    </h3>
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ""
};

export default Header;
