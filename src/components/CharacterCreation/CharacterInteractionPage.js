import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import { NeighborContext, UserContext, CookieContext } from "../../context";
import CharacterDisplay from "./CharacterDisplay";

function CharacterInteractionPage() {
  const { username } = useContext(UserContext);
  const { refreshCookies } = useContext(CookieContext);
  const {
    visitAddress,
    neighborMsg,
    setNeighborMsg,
    currNeighbor,
    giveCookie,
    getCookie,
    setCurrNeighbor,
  } = useContext(NeighborContext);
  const [dialogue, setDialogue] = useState(
    `Hi, ${username}! It's nice to see you. Would you mind doing me a favor?`
  );
  // Finds neighbor info based off house address listed in URL
  let { add } = useParams();
  let address = add.split("%20").join(" ");
  useEffect(() => {
    visitAddress(address);
    return setNeighborMsg("");
  }, []);

  // Ensures the current neighbor is reset when component is closed.
  useEffect(() => {
    return setCurrNeighbor(null);
  }, []);

  return (
    <div>
      {/* If neighbor exists, display name */}
      {currNeighbor && <div>{currNeighbor.name}'s House</div>}
      <div>
        {/* If neighbor exists, display neighbor, house, and dialogue box */}
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
                  {/* Button to get cookie from neighbor */}
                  <button
                    onClick={() => {
                      setDialogue(getCookie(currNeighbor));
                      refreshCookies();
                    }}
                  >
                    Accept Delivery
                  </button>
                  {/* Button to deliver cookie to neighbor if one exists */}
                  <button
                    onClick={() => {
                      setDialogue(giveCookie(currNeighbor));
                      refreshCookies();
                    }}
                  >
                    Deliver Cookie
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {/* If no neighbor or error, display error message */}
        {!currNeighbor && neighborMsg && <div>{neighborMsg}</div>}
      </div>
    </div>
  );
}

export default CharacterInteractionPage;
