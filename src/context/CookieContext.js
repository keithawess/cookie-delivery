import React, {useState, createContext, useEffect} from "react";

export const CookieContext = createContext(null);

export function CookieProvider(props) {
    const [cookieBasket, setCookieBasket] = useState([]);

    useEffect(()=>{
        
    })
    
    return (
        <CookieProvider value={{cookieBasket}} >
            {props.children}
        </CookieProvider>
    )
}