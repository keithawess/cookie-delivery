import React from "react";
import { useHistory } from "react-router-dom";

function LandingPage({population}) {
  const history = useHistory();

  return (
    <div className="landing-page flex">
      <div className="bg-sign-green welcome-sign text-center text-white">
        <div>Welcome to Cookietown</div>
        <div className="text-small">Population: {population}</div>
        <button onClick={()=>{
            history.push("/login")
        }}>Current Residents</button>
        <button onClick={()=>{
            history.push("/signup")
        }}>New Residents</button>
      </div>
    </div>
  );
}

export default LandingPage;
