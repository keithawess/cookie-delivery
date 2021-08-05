import React from 'react'
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import CharacterDisplay from './CharacterDisplay';

function CharacterCreationPage() {
    return (
        <div className={"bg-white"}>
            CharacterCreactionPage
            <CharacterDisplay name={"Bobby"} face={2} height={100} house={2} roundness={3} color={"#1a9393"} height={50}/>
            <CharacterHouseDisplay/>
        </div>
    )
}

export default CharacterCreationPage
