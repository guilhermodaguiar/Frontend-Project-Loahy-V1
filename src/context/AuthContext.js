import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(JWT) {

        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        fetchUserData(decoded.sub, JWT);
    }

    function logout(e) {
        localStorage.clear();
        e.preventDefault();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');
        history.push('/');
    }


    async function fetchUserData(user_email, token) {
        try {
            const response = await axios.get(`http://localhost:8080/users/${user_email}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    user_email: response.data.userEmail,
                    user_password: response.data.password,
                    user_id: response.data.userId,
                    roles: response.data.authorities[0].authority,
                    user_firstname: response.data.userFirstName,
                    user_lastname: response.data.userLastName,
                    user_street_name: response.data.userStreetName,
                    user_house_number: response.data.userHouseNumber,
                    user_house_number_add: response.data.userHouseNumberAddition,
                    user_city: response.data.userCity,
                    user_zipcode: response.data.userZipcode,
                    user_phone: response.data.userPhone,
                },
                status: 'done',
            });

        } catch (e) {
            console.error('Er is iets misgegaan', e);
            localStorage.clear();
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;