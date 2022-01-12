import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
    const { authTokens } = useContext(AuthContext);
    return (
        <Route {...rest}>
            {authTokens ? children : <Redirect to="/signin" />}
        </Route>
    );
};

export default PrivateRoute;
