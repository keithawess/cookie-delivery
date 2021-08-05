import React, { useState } from "react";
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import CharacterDisplay from "./CharacterDisplay";
import sad from "./images/sad.png";
import happy from "./images/happy.png";
import skeptic from "./images/skeptic.png";
import smile from "./images/smile.png";
const faces = [sad, happy, skeptic, smile];

function CharacterCreationPage() {
  const [step, setStep] = useState("0");
  const [height, setHeight] = useState(75);
  const [roundness, setRoundness] = useState(0);
  const [color, setColor] = useState("#FFFFFF");
  const [name, setName] = useState("");
  const [face, setFace] = useState(0);
  const [addressNum, setAddressNum] = useState(0);
  const [addressStName, setAddressStName] = useState("Gingerbread");
  const [addressStType, setAddressStType] = useState("Ave");

  return (
    <div className={"bg-white character-creation-container center"}>
      CharacterCreactionPage
      <div className="flex justify-center align-items-center character-creation-neighbor">
        <CharacterDisplay
          name={name}
          face={face}
          color={color}
          roundness={roundness}
          height={height}
        />
      </div>
      <div className="margin-5">
        <label htmlFor="nameInput">Name: </label>
        <input
          id="nameInput"
          value={name}
          onChange={(e) => {
            if (e.target.value.length <= 20) setName(e.target.value);
          }}
        />
      </div>
      <div className="flex input-container">
        <div className="margin-5 flex-third">
          <div>
            <label htmlFor="heightBar">Height:</label>
            <input
              id="heightBar"
              type="range"
              min="50"
              max="100"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              className="slider"
            />
          </div>

          <div>
            <label htmlFor="roundnessBar">Roundness:</label>
            <input
              id="roundnessBar"
              type="range"
              min="0"
              max="50"
              value={roundness}
              onChange={(e) => {
                setRoundness(e.target.value);
              }}
              className="slider"
            />
          </div>
        </div>

        <div className="margin-5 flex-third">
          <label htmlFor="colorSelector">Color:</label>
          <br/>
          <input
            id="colorSelector"
            className="input-container"
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </div>

        <div className="margin-5 flex-third">
          <label htmlFor="faceSelector">Face:</label>
          <div className="flex wrap">
            {faces.map((val, i) => {
              return (
                <div className="margin-5 flex flex-half justify-space-around align-items-center" onClick={()=>
                {
                    setFace(i);
                }}>
                  <img className={`neighbor-face ${face === i ? "selected" : ""}`} src={val}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreationPage;
