import React, { useContext } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { NeighborContext } from "../../context";
import CharacterHouseDisplay from "../CharacterCreation/CharacterHouseDisplay";

function Street() {
  const { neighborhood } = useContext(NeighborContext);

  return (
    <div className="bg-street">
      Street
      <div className="flex width-95 justify-space-evenly">
        <div className="flex col">
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
        <div className="flex col">
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
