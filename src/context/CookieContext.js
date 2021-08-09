import React, { useState, createContext, useCallback } from "react";
import Cookies from "universal-cookie";
export const CookieContext = createContext(null);

export function CookieProvider(props) {
  const [cookieBox, setCookieBox] = useState([]);
  const [hidden, setHidden] = useState(true);
  const cookies = new Cookies();

  // Function to pull information from cookies and save them in state.
  const refreshCookies = useCallback(() => {
    let cookiesList = Object.entries(cookies.getAll());
    setCookieBox([]);
    for (let i = 0; i < cookiesList.length; i++) {
      if (cookiesList[i][0].includes("'s Cookie")) {
        setCookieBox((curr) => [...curr, cookiesList[i]]);
      }
    }
  }, []);

  return (
    <CookieContext.Provider
      value={{ cookieBox, hidden, setHidden, refreshCookies }}
    >
      {props.children}
    </CookieContext.Provider>
  );
}
