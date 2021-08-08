import React, { useContext } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { NeighborContext } from "../../context";
import CharacterHouseDisplay from "../CharacterCreation/CharacterHouseDisplay";

function Street() {
  const { neighborhood } = useContext(NeighborContext);

  return (
    <div className="bg-green height-95">
      Street
      <div className="flex width-95 justify-center center height-95">
        <div className="flex col justify-space-evenly">
          {neighborhood
            .filter((house, i) => i < 5)
            .map((house, i) => {
              return (
                <NavLink key={i + 100} to={`/address/${house.address}`}>
                  <CharacterHouseDisplay
                    key={i}
                    height={100}
                    house={house.house}
                  />
                </NavLink>
              );
            })}
        </div>
        <div className="bg-grey flex-quarter">&nbsp;</div><div className="bg-grey flex-quarter street">&nbsp;</div>
        <div className="flex col justify-space-evenly">
          {neighborhood
            .filter((house, i) => i >= 5)
            .map((house, i) => {
              return (
                <NavLink key={i + 100} to={`/address/${house.address}`}>
                  <CharacterHouseDisplay
                    key={i}
                    height={100}
                    house={house.house}
                  />
                </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Street;
