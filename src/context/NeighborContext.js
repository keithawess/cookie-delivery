import React, {useState, useCallback, createContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const NeighborContext = createContext(null);

export function NeighborProvider(props) {
    const [population, setPopulation] = useState(0);
    const { callAPI: popCall } = useFetch("GET");

    useEffect(() => {
        async function fetchData() {
            const res = await popCall("/api/folk/population");
            if (res.success)
            {
                setPopulation(res.data);
            }
        } fetchData();
    }, [])

    const getPopulation = useCallback(()=>{
        async function fetchData() {
            const res = await popCall("/api/folk/population");
            if (res.success) {
                return res.data;
            }
        }
    })

    return (
        <NeighborContext.Provider value= {{population}}>
            {props.children}
        </NeighborContext.Provider>
    )
}