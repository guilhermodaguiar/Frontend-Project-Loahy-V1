import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";

export const UserAuthContext = createContext({});

function UserAuthContextProvider({ children }) {
    const [Auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
    });
    const history = useHistory();

    function login(token) {
        console.log(token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        localStorage.setItem('user_token', token);

        console.log('De gebruiker is ingelogd');
        toggleAuth({
            isAuth: true,
            //user komt uit de backend
            user: {
                email: decodedToken.email,
                username: decodedToken.sub,
            },
        });
        history.push('costumer/profile');
    }

    function logout() {
        console.log('De gebruiker is uitgelogd');
        toggleAuth({
            isAuth: false,
            user: null,
        });
        history.push('/');
    }

    const contextData = {
        isAuth: Auth.isAuth,
        login: login,
        logout: logout,
    };

    return (
        <UserAuthContext.Provider value={contextData}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthContextProvider;