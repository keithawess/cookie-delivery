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
      <div>
        <label htmlFor="nameInput">Name:</label>
        <input id="nameInput" />
      </div>
      <div className="flex">
        <div>
          <div>
            <label htmlFor="heightBar">Height:</label>
            <input id="heightBar" type="range" />
          </div>

          <div>
            <label htmlFor="roundnessBar">Roundness:</label>
            <input id="roundnessBar" type="range" />
          </div>
        </div>

        <div>
          <label htmlFor="colorSelector">Color:</label>
          <input id="colorSelector" type="color" />
        </div>

        <div>
          <label htmlFor="faceSelector">Face:</label>
          <div>
            {faces.map((val) => {
              return <img src={val} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreationPage;
