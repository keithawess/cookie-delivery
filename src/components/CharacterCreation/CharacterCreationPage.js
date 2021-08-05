import React, { useState } from 'react'
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import CharacterDisplay from './CharacterDisplay';

function CharacterCreationPage() {
    const [step, setStep] = useState("0");
    const [height, setHeight] = useState(50);
    const [roundness, setRoundness] = useState(0);
    const [color, setColor] = useState("#FFFFFF");
    const [name, setName] = useState("");
    const [face, setFace] = useState(0);
    const [addressNum, setAddressNum] = useState(0);
    const [addressStName, setAddressStName] = useState("Gingerbread");
    const [addressStType, setAddressStType] = useState("Ave");

    return (
        <div className={"bg-white"}>
            CharacterCreactionPage

        <CharacterDisplay name={name} face={face} color={color} roundness={roundness} height={height} />


        </div>
    )
}

export default CharacterCreationPage
