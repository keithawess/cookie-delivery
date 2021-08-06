import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterHouseDisplay from "./CharacterHouseDisplay";
import { NeighborContext, UserContext } from "../../context";
import CharacterDisplay from "./CharacterDisplay";

function CharacterInteractionPage() {
    const {username} = useContext(UserContext);
    const { visitAddress, neighborMsg, setNeighborMsg, currNeighbor, giveCookie, getCookie } =
    useContext(NeighborContext);
    const [dialogue, setDialogue] = useState(`Hi, ${username}! It's nice to see you. Would you mind doing me a favor?`)
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
            <div>
                <div>{dialogue}</div>
                <div><button onClick={()=>{setDialogue(getCookie(currNeighbor))}}>Accept Delivery</button><button onClick={()=>{setDialogue(giveCookie(currNeighbor))}}>Deliver Cookie</button></div>
            </div>
          </>
        )}
        {!currNeighbor && neighborMsg && <div>{neighborMsg}</div>}
      </div>
    </div>
  );
}

export default CharacterInteractionPage;
