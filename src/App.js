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
import CharacterCreationPage from "./components/CharacterCreation/CharacterCreationPage";
import CookieBasket from "./components/CookieBasket/CookieBasket";
import ProtectedRoute from "./shared/ProtectedRoute";
import CharacterInteractionPage from "./components/CharacterCreation/CharacterInteractionPage";
import { UserContext, NeighborContext } from "./context";
import "./App.css";

function App() {
  const { username, logout } = useContext(UserContext);
  return (
    <Router>
      <div className="App bg-town">
        {username && (
          <nav className="flex justify-space-evenly">
            <NavLink
              activeClassName="active nav-option"
              className="bg-sign-green white-border nav-option text-white"
              exact
              to="/street"
            >
              Street
            </NavLink>
            <NavLink
              activeClassName="active nav-option"
              className="bg-sign-green white-border nav-option text-white"
              to="/neighbor-creator"
            >
              Neighbor
            </NavLink>
            <NavLink
              onClick={() => {
                logout();
              }}
              activeClassName="bg-sign-green"
              className="bg-sign-green white-border nav-option text-white"
              to="/"
            >
              Logout
            </NavLink>
          </nav>
        )}
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
          <ProtectedRoute reqUser={true} path="/street">
            <Street />
          </ProtectedRoute>
          <ProtectedRoute reqUser={true} path="/neighbor-creator">
            <CharacterCreationPage />
          </ProtectedRoute>
          <ProtectedRoute reqUser={true} path="/address/:add">
            <CharacterInteractionPage />
          </ProtectedRoute>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      <CookieBasket />
      </div>
    </Router>
  );
}

export default App;
