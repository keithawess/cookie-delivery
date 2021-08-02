import React, { useState } from "react";

function Signup() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <div>
      Signup
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
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
          />
        </div>
        
        <button>
            Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
