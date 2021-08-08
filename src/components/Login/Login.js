import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../context";

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");
  const { initialLogin, username } = useContext(UserContext);

  return (
    <div className="landing-page flex">
      <form className="welcome-sign center bg-sign-green">
        Login
        <div>
          <label htmlFor="username">Username: </label>
          <input
            value={usernameInput}
            onChange={(e) => {
              setUsernameInput(e.target.value);
            }}
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
          />
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (usernameInput && passwordInput && !username) {
              let error = initialLogin(usernameInput, passwordInput);
              if (error) {
                setError(error);
              }
              setError("Success!");
            } else {
              setError("Please enter a username and password.");
            }
          }}
        >
          Login
        </button>
        <button onClick={()=>{history.push("/signup")}}>Signup</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
