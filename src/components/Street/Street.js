import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { NeighborContext } from "../../context";
import CharacterHouseDisplay from "../CharacterCreation/CharacterHouseDisplay";

function Street() {
  const { neighborhood } = useContext(NeighborContext);

  return (
    <div>
      Street
      <div className="flex width-95 justify-space-evenly">
        <div className="flex-half flex col">
          {neighborhood
            .filter((house, i) => i < 5)
            .map((house, i) => {
              return (
                <div key={i + 100} onClick={()=>{<Redirect to="/"/>}}>
                  <CharacterHouseDisplay
                    key={i}
                    height={100}
                    house={house.house}
                  />
                </div>
              );
            })}
        </div>
        <div className="flex-half flex col">
          {neighborhood
            .filter((house, i) => i >= 5)
            .map((house, i) => {
              return (
                <div key={i + 100} onClick={()=>{<Redirect to="/"/>}}>
                  <CharacterHouseDisplay
                    key={i}
                    height={100}
                    house={house.house}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Street;
