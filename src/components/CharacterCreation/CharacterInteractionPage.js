import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import { NeighborContext } from "../../context";
import CharacterDisplay from "./CharacterDisplay";

function CharacterInteractionPage() {
  const { visitAddress, neighborMsg, setNeighborMsg, currNeighbor } =
    useContext(NeighborContext);
  let { add } = useParams();
  let address = add.split("%20").join(" ");

  useEffect(() => {
    visitAddress(address);
    return setNeighborMsg("");
  }, []);

  return (
    <div>
      {currNeighbor && <div>{currNeighbor.name}'s House</div>}
      <div>
        {currNeighbor && (
          <>
            <div className="absolute abs-center z-back">
              <CharacterHouseDisplay house={currNeighbor.house} height={200} />
            </div>
            <div className="absolute abs-center z-middle"><CharacterDisplay color={currNeighbor.color} height={currNeighbor.height} face={currNeighbor.face} roundness={currNeighbor.roundness} /></div>
          </>
        )}
        {!currNeighbor && neighborMsg && <div>{neighborMsg}</div>}
      </div>
    </div>
  );
}

export default CharacterInteractionPage;
