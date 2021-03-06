import React, { useState, useCallback, createContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Cookies from "universal-cookie";
const NEIGHBOR_LIMIT = 10;

export const NeighborContext = createContext(null);

export function NeighborProvider(props) {
  const [neighborhood, setNeighborhood] = useState([]);
  const [currNeighbor, setCurrNeighbor] = useState(null);
  const [vin, setVin] = useState([]);
  const [population, setPopulation] = useState(0);
  const [neighborMsg, setNeighborMsg] = useState("");
  const { callAPI: popCall } = useFetch("GET");
  const { callAPI: addCall } = useFetch("POST");
  const { callAPI: randCall } = useFetch("GET");
  const { callAPI: houseCall } = useFetch("POST");
  const cookies = new Cookies();

  // When application loads/refreshes populates neighborhood with random neighbors
  useEffect(() => {
    async function fetchData() {
      const res = await randCall("/api/folk/random");
      if (res.success) {
        let temp = [...vin, ...res.data];
        while (temp.length > NEIGHBOR_LIMIT) {
          temp.pop();
        }
        temp = shuffle(temp);
        setNeighborhood(temp);
      } else {
        return res.error;
      }
    }
    fetchData();
  }, []);

  // Function to add neighbor to database
  const addNeighbor = useCallback((neighbor) => {
    async function fetchData() {
      const res = await addCall("/api/folk/add", {
        neighbor: {
          name: neighbor.name,
          address: neighbor.address,
          house: neighbor.house,
          face: neighbor.face,
          color: neighbor.color,
          roundness: neighbor.roundness,
          height: neighbor.height,
        },
      });

      if (res.success) {
        setVin((vin) => [...vin, neighbor]);
        setNeighborMsg("Successfully added neighbor!");
      } else {
        setNeighborMsg(res.error);
      }
    }
    fetchData();
  }, []);

  // Pulls number of neighbors in database
  useEffect(() => {
    async function fetchData() {
      const res = await popCall("/api/folk/population");
      if (res.success) {
        setPopulation(res.data);
      }
    }
    fetchData();
  }, []);

  // Function to get new cookie from neighbor for another neighbor in the neighborhood
  const getCookie = useCallback(
    (neighbor) => {
      let rand = Math.floor(Math.random() * 10);
      let randTime = Math.floor(Math.random() * 60 + 1) * 60;
      while (neighborhood[rand].address === neighbor.address) {
        rand = Math.floor(Math.random() * 10);
      }
      cookies.set(
        `${neighborhood[rand].name}'s Cookie`,
        `To: ${neighborhood[rand].name} ${neighborhood[rand].address} From: ${neighbor.name}`,
        { maxAge: randTime }
      );
      return `This cookie goes to ${neighborhood[rand].name}, located at ${
        neighborhood[rand].address
      }. This cookie goes bad in ${randTime / 60} minutes, so don't be late!`;
    },
    [neighborhood]
  );

  // Pulls information about a neighbor based off address
  const visitAddress = useCallback((address) => {
    async function fetchData() {
      const res = await houseCall("/api/folk/get", { address: address });
      if (res.success) {
        setCurrNeighbor(res.data);
      } else {
        setNeighborMsg(res.error);
      }
    }
    return fetchData();
  });

  // Removes cookie when correct neighbor is found
  const giveCookie = useCallback((neighbor) => {
    let from;
    if (cookies.get(`${neighbor.name}'s Cookie`)) {
      let split = cookies.get(`${neighbor.name}'s Cookie`).split(" ");
      from = split[split.length - 1];
      cookies.remove(`${neighbor.name}'s Cookie`);
      return `Om nom nom! ${from}'s cookies are the best. Thank you for delivering this to me!`;
    } else {
      return `You don't have anything for me? I have cookies to give out if you're not busy.`;
    }
  });

  // Shuffles array given
  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <NeighborContext.Provider
      value={{
        population,
        addNeighbor,
        neighborhood,
        vin,
        getCookie,
        giveCookie,
        neighborMsg,
        setNeighborMsg,
        visitAddress,
        currNeighbor,
        setCurrNeighbor,
      }}
    >
      {props.children}
    </NeighborContext.Provider>
  );
}
