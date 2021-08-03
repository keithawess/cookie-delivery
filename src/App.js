import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Street from "./components/Street/Street";
import CharacterCreationPage from "./components/CharacterCreation/CharacterCreationPage"
import { UserContext } from "./context";
import "./App.css";

function App() {
  const { username, logout } = useContext(UserContext);
  return (
    <Router>
      <div className="App bg-town">
        {!username && (
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        )}

        {username && (
          <>
            <NavLink activeClassName="active" exact to="/">
              Street
            </NavLink>
            <NavLink activeClassName="active" to="/neighbor-creator">
              Neighbor Creator
            </NavLink>
            <NavLink
              onClick={() => {
                logout();
              }}
              activeClassName="active"
              to="/"
            >
              Logout
            </NavLink>
            <Switch>
              <Route exact path="/">
                <Street />
              </Route>
              <Route path="/neighbor-creator">
                <CharacterCreationPage />
              </Route>

              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
