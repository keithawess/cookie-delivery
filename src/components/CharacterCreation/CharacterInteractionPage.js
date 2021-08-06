import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import { NeighborContext } from "../../context";

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
      CharacterInteractionPage
      <div className="absolute abs-center z-back">
        {currNeighbor && (
          <div>
            <CharacterHouseDisplay house={currNeighbor.house} height={200} />
          </div>
        )}
        {!currNeighbor && neighborMsg && <div>{neighborMsg}</div>}
      </div>
    </div>
  );
}

export default CharacterInteractionPage;
