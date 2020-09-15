import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

function Header() {
  return (
    <div class="navbar navbar-inverse navbar-static-top">
      <div class="container">
        <div className="header-wrapper">
          <div>
            <Link to="/" class="navbar-brand">
              Home
            </Link>
          </div>
          <div>
            <Link to="/champions" class="navbar-brand">
              World Champions
            </Link>
          </div>
          <div>
            <Link to="/game" class="navbar-brand">
              Play
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
