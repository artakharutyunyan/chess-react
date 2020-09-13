import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

function Header() {
  return (
    <div class="navbar navbar-inverse navbar-static-top">
      <div class="container">
        <div className="wrapper">
          <div>
            <Link to="/" class="navbar-brand">
              Home
            </Link>
          </div>
          <div>
            <Link to="/game" className="play-button">
              Play
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
