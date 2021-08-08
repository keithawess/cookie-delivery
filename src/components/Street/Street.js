import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { NeighborContext } from "../../context";
import CharacterHouseDisplay from "../CharacterCreation/CharacterHouseDisplay";

function Street() {
  const history = useHistory();
  const [searchBox, setSearchBox] = useState();
  const { neighborhood } = useContext(NeighborContext);

  return (
    <div className="bg-green height-95">
      <div>
        <label className="text-white" htmlFor="search">
          Address:{" "}
        </label>{" "}
        <input
          value={searchBox}
          onChange={(e) => {
            setSearchBox(e.target.value);
          }}
          id="search"
        />
        <button
          onClick={() => {
            if (searchBox) {
              let arr = searchBox.split(" ");
              if (arr.length === 3 && !isNaN(arr[0])){
                history.push(`/address/${arr.join("%20")}`);
              }
            }
          }}
        >
          Search
        </button>
      </div>
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
        <div className="bg-grey flex-quarter">&nbsp;</div>
        <div className="bg-grey flex-quarter street">&nbsp;</div>
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
