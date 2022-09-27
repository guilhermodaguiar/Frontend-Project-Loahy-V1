import React, {createContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token ) {
            const decodedToken = jwtDecode(token);
            getAuthData(decodedToken.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, [])

    function login(token) {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token);
        getAuthData(decodedToken.sub, token);
    }

    function logout(e) {
        localStorage.clear();
        e.preventDefault();
        console.log('De gebruiker is uitgelogd');
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    async function getAuthData(id, token) {
        try {
            const response = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            toggleIsAuth({
                ...isAuth,
                auth: true,
                user: {
                    userEmail: response.data.userEmail,
                    password: response.data.userPassword,
                    user_id: response.data.userId,
                    roles: response.data.authorities[0].authority,
                    customer_id: response.data.customer.id,
                    customer_firstname: response.data.customer.customerFirstname,
                    customer_lastname: response.data.customer.personLastname,
                    customer_street_name: response.data.customer.personStreetName,
                    customer_house_number: response.data.customer.personHouseNumber,
                    customer_house_number_addition: response.data.customer.userHouseNumberAddition,
                    customer_city: response.data.customer.personCity,
                    customer_zipcode: response.data.customer.personZipcode,
                    customer_phone: response.data.customer.customerPhone
                },
                status: 'done',
            });

        } catch (error) {
            console.error('ERROR', error);
            localStorage.clear();
        }
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p> Een moment, geduld alstublieft..</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;