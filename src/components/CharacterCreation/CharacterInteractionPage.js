import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import { NeighborContext, UserContext } from "../../context";
import CharacterDisplay from "./CharacterDisplay";

function CharacterInteractionPage() {
  const { username } = useContext(UserContext);
  const {
    visitAddress,
    neighborMsg,
    setNeighborMsg,
    currNeighbor,
    giveCookie,
    getCookie,
    setCurrNeighbor
  } = useContext(NeighborContext);
  const [dialogue, setDialogue] = useState(
    `Hi, ${username}! It's nice to see you. Would you mind doing me a favor?`
  );
  let { add } = useParams();
  let address = add.split("%20").join(" ");

  useEffect(() => {
    visitAddress(address);
    return setNeighborMsg("");
  }, []);

  useEffect(() => {
    return setCurrNeighbor(null);
  },[])

  return (
    <div>
      {currNeighbor && <div>{currNeighbor.name}'s House</div>}
      <div>
        {currNeighbor && (
          <>
            <div className="absolute abs-container z-back">
              <CharacterHouseDisplay house={currNeighbor.house} height={275} />
            </div>
            <div className="absolute abs-container abs-neighbor">
              <CharacterDisplay
                color={currNeighbor.color}
                height={currNeighbor.height}
                face={currNeighbor.face}
                roundness={currNeighbor.roundness}
              />
            </div>
            <div className="absolute abs-container abs-dia">
              <div className="dialogue-container center bg-cloud width-90">
                <div>{dialogue}</div>
                <div>
                  <button
                    onClick={() => {
                      setDialogue(getCookie(currNeighbor));
                    }}
                  >
                    Accept Delivery
                  </button>
                  <button
                    onClick={() => {
                      setDialogue(giveCookie(currNeighbor));
                    }}
                  >
                    Deliver Cookie
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {!currNeighbor && neighborMsg && <div>{neighborMsg}</div>}
      </div>
    </div>
  );
}

export default CharacterInteractionPage;
