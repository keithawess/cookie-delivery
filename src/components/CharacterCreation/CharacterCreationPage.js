import React, { useContext, useEffect, useState } from "react";
import { NeighborContext } from "../../context";
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import CharacterDisplay from "./CharacterDisplay";
import sad from "./images/sad.png";
import happy from "./images/happy.png";
import skeptic from "./images/skeptic.png";
import smile from "./images/smile.png";
import house1 from "./images/house1.png";
import house2 from "./images/house2.png";
import house3 from "./images/house3.png";
const houseArr = [house1, house2, house3];
const faces = [happy, sad, skeptic, smile];

function CharacterCreationPage() {
  const [height, setHeight] = useState(75);
  const [roundness, setRoundness] = useState(25);
  const [color, setColor] = useState("#FF0000");
  const [name, setName] = useState("");
  const [face, setFace] = useState(0);
  const [house, setHouse] = useState(0);
  const [houseNum, setHouseNum] = useState(123);
  const [streetName, setStreetName] = useState("Gingerbread");
  const [streetType, setStreetType] = useState("Ave");
  const [nameError, setNameError] = useState(false);
  const [addError, setAddError] = useState(false);

  const { addNeighbor, neighborMsg, setNeighborMsg } =
    useContext(NeighborContext);

  useEffect(() => {
    return setNeighborMsg("");
  }, []);

  return (
    <div
      className={
        "bg-cloud dialogue-container character-creation-container center margin-bot-20"
      }
    >
      <h2>Create a Neighbor</h2>
      <div>
        <div className="flex justify-space-around align-items-center character-creation-neighbor flex-quarter">
          <div className="flex-half">
            <CharacterHouseDisplay house={house} height={150} />
          </div>
          <div className="margin-5 flex-half">
            <CharacterDisplay
              name={name}
              face={face}
              color={color}
              roundness={roundness}
              height={height}
            />
          </div>
        </div>
        <div className="margin-5">
          <label htmlFor="nameInput">Name: </label>
          <input
            id="nameInput"
            className={nameError ? "name-error" : ""}
            value={name}
            onChange={(e) => {
              if (e.target.value.length <= 20) setName(e.target.value);
            }}
          />
        </div>
        <div className="flex input-container flex-fifth max-height-200">
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
                className="width-95"
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
                className="width-95"
              />
            </div>
          </div>

          <div className="margin-5 flex-third">
            <label htmlFor="colorSelector">Color:</label>
            <br />
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
                  <div
                    key={i + 1000}
                    className="margin-5 flex flex-half justify-space-around align-items-center"
                    onClick={() => {
                      setFace(i);
                    }}
                  >
                    <img
                      key={i + 100}
                      className={`neighbor-face neighbor-face-list ${
                        face === i ? "selected" : ""
                      }`}
                      src={val}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="center">
          <label htmlFor="houseSelector">House:</label>
          <div className="flex align-items-end justify-space-evenly">
            {houseArr.map((house, i) => {
              return (
                <div
                  key={i + 10000}
                  onClick={() => {
                    setHouse(i);
                  }}
                >
                  <CharacterHouseDisplay key={i} house={i} height={90} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-quarter">
          <label htmlFor="houseNumber">House Number: </label>
          <input
            id="houseNumber"
            className={addError ? "name-error" : ""}
            value={houseNum}
            onChange={(e) => {
              setHouseNum(e.target.value);
            }}
          />
          <label htmlFor="streetName"> Street: </label>
          <select
            id="streetName"
            value={streetName}
            onChange={(e) => {
              setStreetName(e.target.value);
            }}
          >
            <option value="Gingerbread">Gingerbread</option>
            <option value="Butterscotch">Butterscotch</option>
          </select>
          <select
            id="streetType"
            value={streetType}
            onChange={(e) => {
              setStreetType(e.target.value);
            }}
          >
            <option value="St">St</option>
            <option value="Ave">Ave</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => {
          setNameError(false);
          setAddError(false);
          if (name && !isNaN(houseNum)) {
            let address = `${houseNum} ${streetName} ${streetType}`;
            let neighbor = {
              name,
              address,
              house,
              face,
              color,
              roundness,
              height,
            };
            addNeighbor(neighbor);
          }
          if (!name)
          {
            setNameError(true);
          }
          if (isNaN(houseNum))
          {
            setAddError(true);
          }
        }}
      >
        Submit
      </button>
      <div>{neighborMsg}</div>
    </div>
  );
}

export default CharacterCreationPage;
