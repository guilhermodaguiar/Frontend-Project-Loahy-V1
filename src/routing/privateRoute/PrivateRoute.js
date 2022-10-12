import React, {useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";


export const PrivateRoute = ({ children, ...rest }) => {
    const { isAuth } = useContext(AuthContext)

    return (
        <Route {...rest} render={() => {
            return isAuth ? children : <Redirect to="/"/>
        }}/>
    );
}

export default PrivateRoute;