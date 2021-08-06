import React from 'react'

function CookieBasket() {
    let cookies = [1,2,3,4,5,6,7,8,9,0];
    return (
        <div>
            <div className="absolute basket flex wrap">
                {cookies.map((cookie)=> {
                    return <div className="border flex-fifth flex justify-center align-items-center">{cookie}</div>
                }
                )}
            </div>
        </div>
    )
}

export default CookieBasket
