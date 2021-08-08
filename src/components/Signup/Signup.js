import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../context";
import useFetch from "../../hooks/useFetch";

function Signup() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");
  const { initialLogin } = useContext(UserContext);
  const { callAPI: signupCall } = useFetch("POST");

  return (
    <div className="landing-page flex text-white">
      <form className="welcome-sign center bg-sign-green">
        Signup
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
            if (
              usernameInput &&
              passwordInput &&
              usernameInput.length > 3 &&
              usernameInput.length <= 20 &&
              passwordInput.length >= 6
            ) {
              let res = await signupCall("/api/users/signup", {
                username: usernameInput,
                password: passwordInput,
              });
              if (res.error) {
                return setError(res.error);
              }
              setError("Signup successful!");
              initialLogin(usernameInput, passwordInput);
            } else {
              setError(
                "Username must be 3-20 characters long.\nPassword must be at least 6 characters long."
              );
            }
          }}
        >
          Signup
        </button>
        <div>
          Already a member?{" "}
          <button
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
