import React, { useContext, useState } from "react";
import CookieDisplay from "./CookieDisplay";
import { CookieContext } from "../../context";

function CookieBasket({ cookie }) {
  const { cookieBox, setHidden, hidden } = useContext(CookieContext);
  return (
    <div>
      <div
        className={`cookie-basket-transition absolute cookie-button ${
          !hidden ? "cookie-button-up" : ""
        }`}
      >
        <button
          onClick={() => {
            if (hidden) {
              setHidden(false);
            } else {
              setHidden(true);
            }
          }}
        >
          Cookies
        </button>
      </div>
      <div
        className={`absolute basket flex wrap cookie-basket-transition ${
          hidden ? "closed" : ""
        }`}
      >
        {cookieBox &&
          !hidden &&
          cookieBox.length > 0 &&
          cookieBox
            .filter((cookie, i) => {
              if (i < 10) {
                return true;
              }
            })
            .map((cookie, i) => {
              return (
                <div
                  key={i}
                  className="border flex-fifth flex justify-center align-items-center"
                >
                  <CookieDisplay key={i + 100} cookie={0} info={cookie} />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default CookieBasket;
