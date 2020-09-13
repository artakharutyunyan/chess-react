import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/header.js";
import Game from "./components/Game/game.js";
import Home from "./components/HomePage/homePage.js";
import ChampionsList from "./components/ChampionsListPage/championsList.js";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/champions" component={ChampionsList} />
          <Route path="/game" component={Game} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
