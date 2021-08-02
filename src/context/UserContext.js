import React, {useState} from "react";
import useFetch from "../hooks/useFetch";

export const UserContext = createContext(null);

export function UserProvider(props) {
    const [username, setUsername] = useState("");

    const login = useCallback((username, password) => {
        async function fetchData() {
            const res = await loginCall("/api/users/login");
            if (res.success) {
                setUsername(res.data.username);
            }
            else {
                return res.error;
            }
        } fetchData();
    }, [userId]);

    const logout = useCallback(() => {
        setUsername("");
    });

    return (
        <UserContext.Provider value= {{login, username}}>
            {props.children}
        </UserContext.Provider>
    )
}