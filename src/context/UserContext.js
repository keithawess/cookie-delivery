import React, {useState, useCallback, createContext} from "react";
import useFetch from "../hooks/useFetch";

export const UserContext = createContext(null);

export function UserProvider(props) {
    const [username, setUsername] = useState("");
    const { callAPI: loginCall } = useFetch("POST")

    const login = useCallback((username, password) => {
        async function fetchData() {
            const res = await loginCall("/api/users/login", {
                username: username,
                password: password,
            });
            if (res.success) {
                setUsername(username);
            }
            else {
                return res.error;
            }
        } fetchData();
    }, [username]);

    const logout = useCallback(() => {
        setUsername("");
    },[])

    return (
        <UserContext.Provider value= {{login, username, logout}}>
            {props.children}
        </UserContext.Provider>
    )
}