import React from "react";
import CookieDisplay from "./CookieDisplay";

function CookieBasket({ cookie }) {
  let cookies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <div>
      <div className="absolute basket flex wrap">
        {cookies.map((cookie, i) => {
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
