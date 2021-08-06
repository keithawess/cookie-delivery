import React, { useContext } from "react";
import CookieDisplay from "./CookieDisplay";
import { CookieContext } from "../../context";

function CookieBasket({ cookie }) {
  let cookies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const {cookieBox} = useContext(CookieContext);
  return (
    <div>
        <button>Push</button>
      <div className="absolute basket flex wrap">
        {cookieBox && cookieBox.length > 0 && cookieBox.map((cookie, i) => {
          return (
            <div className="border flex-fifth flex justify-center align-items-center">
              <CookieDisplay cookie={0} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CookieBasket;
