import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, NavLink} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage"
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="*" >
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
