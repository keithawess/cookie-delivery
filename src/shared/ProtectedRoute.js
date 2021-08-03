import React, {useContext} from "react";
import {Route, Redirect} from "react-router";
import { UserContext } from "../context";

export default function ProtectedRoute({reqUser, path, children}) {
    const { username } = useContext(UserContext);

    if ((username && reqUser) || (!username && !reqUser))
    {
        return <Route path={path}>{children}</Route>;
    } else {
        return <Redirect to ="/" />;
    }
}