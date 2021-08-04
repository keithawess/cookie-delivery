import React, { useState, useCallback, createContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Cookies from "universal-cookie";
const NEIGHBOR_LIMIT = 10;

export const NeighborContext = createContext(null);

export function NeighborProvider(props) {
  const [neighborhood, setNeighborhood] = useState([]);
  const [vin, setVin] = useState([]);
  const [population, setPopulation] = useState(0);
  const { callAPI: popCall } = useFetch("GET");
  const { callAPI: addCall } = useFetch("POST");
  const { callAPI: randCall } = useFetch("GET");
  const cookies = new Cookies();

  useEffect(() => {
    async function fetchData() {
      const res = await popCall("/api/folk/population");
      if (res.success) {
        setPopulation(res.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await randCall("/api/folk/random");
      if (res.success) {
        let temp = [...vin, ...res.data];
        while (temp.length > NEIGHBOR_LIMIT) {
          temp.pop();
        }
        temp = shuffle(temp);
        console.log(temp.length);

        setNeighborhood(temp);
      } else {
        return res.error;
      }
    }
    fetchData();
  }, []);

  const addNeighbor = useCallback((neighbor) => {
    async function fetchData() {
      const res = addCall("/api/folk/add", {
        name: neighbor.name,
        address: neighbor.address,
        house: neighbor.house,
        face: neighbor.face,
        color: neighbor.color,
        roundness: neighbor.roundness,
        height: neighbor.height,
      });
      if (res.success) {
        setVin((vin) => [...vin, neighbor]);
        return "Successfully added neighbor!";
      } else {
        return res.error;
      }
    }
    fetchData();
  }, []);

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

  const giveCookie = useCallback((neighbor) => {
    console.log(cookies.get(`${neighbor.name}'s Cookie`));
    let from;
    if (cookies.get(`${neighbor.name}'s Cookie`)) {
      let split = cookies.get(`${neighbor.name}'s Cookie`).split(" ");
      from = split[6];
      cookies.remove(`${neighbor.name}'s Cookie`);
      return `Om nom nom! ${from}'s cookies are the best. Thank you for delivering this to me!`;
    }
    else {
        return `You don't have anything for me? I have cookies to give out if you're not busy.`
    }
  });

  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
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
      }}
    >
      {props.children}
    </NeighborContext.Provider>
  );
}
