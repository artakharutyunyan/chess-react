import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import { Game } from "./components/Game/game";
import Home from "./components/HomePage/HomePage";
import ChampionsList from "./components/ChampionsListPage/ChampionsList";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer autoClose={2000} hideProgressBar />
    </>
  );
}

export default App;
