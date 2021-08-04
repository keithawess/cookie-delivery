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
import ProtectedRoute from "./shared/ProtectedRoute";
import { UserContext, NeighborContext } from "./context";
import "./App.css";

function App() {
  const { username, logout } = useContext(UserContext);
  const {neighborhood, vin} = useContext(NeighborContext);
  return (
    <Router>
      <div className="App bg-town">
        {neighborhood.length > 0 && neighborhood.map(val => val.name)}
        {!username && (
          <Switch>
            <ProtectedRoute reqUser={false} exact path={"/"}>
              <LandingPage />
            </ProtectedRoute>
            <ProtectedRoute reqUser={false} path={"/login"}>
              <Login />
            </ProtectedRoute>
            <ProtectedRoute reqUser={false} path={"/signup"}>
              <Signup />
            </ProtectedRoute>
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
              <ProtectedRoute reqUser={true} exact path="/">
                <Street />
              </ProtectedRoute>
              <ProtectedRoute reqUser={true} path="/neighbor-creator">
                <CharacterCreationPage />
              </ProtectedRoute>

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
