import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/header.js";
import Game from "./components/Game/game.js";
import Home from "./components/HomePage/homePage.js";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
