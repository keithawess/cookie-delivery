import React from 'react'
import cookie1 from "./images/cookie1.png";
import cookie2 from "./images/cookie2.png";
import cookie3 from "./images/cookie3.png";
const cookieList = [cookie1, cookie2, cookie3];

function CookieDisplay({cookie}) {
    return (
        <div>
            <img className="cookie" src={cookieList[cookie]}/>
        </div>
    )
}

export default CookieDisplay
