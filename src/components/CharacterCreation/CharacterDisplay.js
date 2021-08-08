import React from "react";
import sad from "./images/sad.png";
import happy from "./images/happy.png";
import skeptic from "./images/skeptic.png";
import smile from "./images/smile.png";
const faces = [happy, sad, skeptic, smile];

function CharacterDisplay({ name, face, color, roundness, height }) {
  return (
    <div className="flex col align-items-center justify-center">
      {name ? name : <div>&nbsp;</div>}
      <div
        className="flex justify-center align-items-center"
        style={{
          backgroundColor: color,
          borderRadius: roundness + "%",
          height: height + "px",
          width: height + "px",
        }}
      >
        <img className="neighbor-face" src={faces[face]} />
      </div>
    </div>
  );
}

export default CharacterDisplay;
