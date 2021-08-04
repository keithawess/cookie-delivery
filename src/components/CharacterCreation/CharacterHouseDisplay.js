import React from 'react';
import house1 from './images/house1.png'
import house2 from './images/house2.png'
import house3 from './images/house3.png'
const houseArr = [house1, house2, house3]

function CharacterHouseDisplay({house, height}) {
    return (
        <div>
            <img style={{maxHeight: height + 'px'}} className={`house`} src={houseArr[house]}/>
        </div>
    )
}

export default CharacterHouseDisplay
