import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Game from "./components/Game/Game";
import Home from "./components/HomePage/HomePage";
import ChampionsList from "./components/ChampionsListPage/ChampionsList";
import PageNotFound from "./components/PageNotFound/PageNotFound";

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
