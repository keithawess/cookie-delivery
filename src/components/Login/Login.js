import React, { useContext, useState } from "react";
import { UserContext } from "../../context";

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const { initialLogin, username } = useContext(UserContext);

  return (
    <div>
      Login
      <form>
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
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
