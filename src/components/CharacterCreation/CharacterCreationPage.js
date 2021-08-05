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
  const [height, setHeight] = useState(50);
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
      <div className="margin-bot-20">
        <CharacterDisplay
          name={name}
          face={face}
          color={color}
          roundness={roundness}
          height={height}
        />
      </div>
      <div className="margin-5">
        <label htmlFor="nameInput">Name:</label>
        <input id="nameInput" />
      </div>
      <div className="flex input-container">
          <div className="margin-5 flex-third">
            <div>
              <label htmlFor="heightBar">Height:</label>
              <input id="heightBar" type="range" className="slider" />
            </div>

            <div>
              <label htmlFor="roundnessBar">Roundness:</label>
              <input id="roundnessBar" type="range" className="slider" />
            </div>
          </div>

          <div className="margin-5 flex-third">
            <label htmlFor="colorSelector">Color:</label>
            <input id="colorSelector" type="color" />
          </div>

          <div className="margin-5 flex-third">
            <label htmlFor="faceSelector">Face:</label>
            <div className="flex wrap">
              {faces.map((val) => {
                return <div className="margin-5 flex flex-half justify-space-around align-items-center"><img className="neighbor-face" src={val} /></div>;
              })}
            </div>
          </div>
      </div>
    </div>
  );
}

export default CharacterCreationPage;
