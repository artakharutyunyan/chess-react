import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/header.js";
import Game from "./components/Game/game.js";
import Home from "./components/HomePage/homePage.js";
import ChampionsList from "./components/ChampionsListPage/championsList.js";
import PageNotFound from "./components/PageNotFound/pageNotFound";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/champions" component={ChampionsList} />
        <Route path="/game" component={Game} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
