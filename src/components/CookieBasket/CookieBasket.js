import React, { useContext } from "react";
import CookieDisplay from "./CookieDisplay";
import { CookieContext } from "../../context";

function CookieBasket({ cookie }) {
  let cookies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const { cookieBox, setHidden, hidden } = useContext(CookieContext);
  return (
    <div>
      <button className={`cookie-basket-transition ${!hidden? "cookie-button" : ""}`}
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
      <div className={`absolute basket flex wrap cookie-basket-transition ${hidden ? "closed" : ""}`}>
        {cookieBox && !hidden &&
          cookieBox.length > 0 &&
          cookieBox.map((cookie, i) => {
            return (
              <div
                key={i}
                className="border flex-fifth flex justify-center align-items-center"
              >
                <CookieDisplay key={i + 100} cookie={0} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CookieBasket;
