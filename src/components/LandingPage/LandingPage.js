import React from "react";

function LandingPage() {
  return (
    <div className="bg-bisque landing-page flex">
      <div className="bg-sign-green welcome-sign text-center text-white">
        <div>Welcome to Cookietown</div>
        <div className="text-small">Population: ???</div>
        <button>Current Residents</button><button>New Residents</button>
      </div>
    </div>
  );
}

export default LandingPage;
