import React, { useState, createContext, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import { NeighborContext } from ".";

export const CookieContext = createContext(null);

export function CookieProvider(props) {
  const [cookieBox, setCookieBox] = useState([]);
  const [hidden, setHidden] = useState(true);
  const cookies = new Cookies();
  const {getCookie, giveCookie} = useContext(NeighborContext);

  useEffect(() => {
        let cookiesList = Object.entries(cookies.getAll());
        console.log(cookiesList);
        setCookieBox([]);
        for (let i = 0; i < cookiesList.length; i++)
        {
            if (cookiesList[i][0].includes("'s Cookie"))
            {
                setCookieBox(curr=> [...curr, cookiesList[i]]);
            }
        }
  },[getCookie, giveCookie]);



  return (
    <CookieContext.Provider value={{ cookieBox, hidden, setHidden }}>{props.children}</CookieContext.Provider>
  );
}
