import React, {useState} from "react";
export const UserContext = createContext(null);

export function UserProvider(props) {
    const [username, setUsername] = useState("");
}