import React, {useEffect, createContext, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const UserAuthContext = createContext({});

function UserAuthContextProvider({ children }) {
    const history = useHistory();
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        //console.log(token);
        if(token) {
            async function getData() {
            const decodedToken = jwt_decode(token);
            try{
                const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch(e) {
                console.error(e);
            }
        }

        } else {

        }
    }, []);

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
        isAuth: auth.isAuth,
        user: auth.user,
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