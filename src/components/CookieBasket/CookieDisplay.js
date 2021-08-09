import React, { useState } from "react";
import cookie1 from "./images/cookie1.png";
import cookie2 from "./images/cookie2.png";
import cookie3 from "./images/cookie3.png";
const cookieList = [cookie1, cookie2, cookie3];

function CookieDisplay({ cookie, info }) {
  const [modal, setModal] = useState(false);
  return (
    // Displays modal when clicked.
    <div
      onClick={() => {
        if (modal) {
          setModal(false);
        } else {
          setModal(true);
        }
      }}
    >
      {/* Modal containing cookie image and information */}
      <div
        className={`fixed full flex justify-center align-items-center ${
          !modal ? "hidden" : ""
        }`}
      >
        <div className="absolute flex col justify-center align-items-center input-container center modal bg-white">
          <b className="absolute cookie-info-top">{info[0]}</b>
          <img
            className="absolute center modal-cookie"
            src={cookieList[cookie]}
          />
          <div className="absolute cookie-info-bottom">{info[1]}</div>
        </div>
      </div>
      {/* Base cookie display */}
      <img className="cookie" src={cookieList[cookie]} />
    </div>
  );
}

export default CookieDisplay;
