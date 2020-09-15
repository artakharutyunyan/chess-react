import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

function Header() {
  return (
    <div className="navbar navbar-inverse navbar-static-top">
      <div className="container">
        <div className="header-wrapper">
          <div>
            <Link to="/" className="navbar-brand">
              Home
            </Link>
          </div>
          <div>
            <Link to="/champions" className="navbar-brand">
              World Champions
            </Link>
          </div>
          <div>
            <Link to="/game" className="navbar-brand">
              Play
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
