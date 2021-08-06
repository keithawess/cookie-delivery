import React, { useState, useCallback, createContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const UserContext = createContext(null);

export function UserProvider(props) {
  const [username, setUsername] = useState("");
  const { callAPI: loginCall } = useFetch("POST");
  const { callAPI: logoutCall } = useFetch("GET");
  const { callAPI: validateCall } = useFetch("GET");

  const initialLogin = useCallback(
    (username, password) => {
      async function fetchData() {
        const res = await loginCall("/api/users/login", {
          username: username,
          password: password,
        });
        if (res.success) {
          setUsername(username);
        } else {
          return res.error;
        }
      }
      fetchData();
    },
    [username]
  );

  const login = useCallback((user) => {
    setUsername(user.username);
  });

  useEffect(() => {
    async function validate() {
      const res = await validateCall("/api/users/validate");
      if (res.success) {
        login(res.data);
      }
    }
    validate();
  }, []);

  const logout = useCallback(() => {
    async function fetchData() {
      const res = await logoutCall("/api/users/logout");
      if (res.success) {
        setUsername("");
      }
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ initialLogin, username, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}
