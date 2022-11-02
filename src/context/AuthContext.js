import React, {createContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

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

        if (token ) {
            const decodedToken = jwtDecode(token);
            getData(decodedToken.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, [])


    function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        getData(decodedToken.sub, token);
    }

    function logout(e) {
        localStorage.clear();
        e.preventDefault();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        history.push('/');
    }

    async function getData(id, token) {
        try {
            const response = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    user_email: response.data.userEmail,
                    user_password: response.data.userPassword,
                    user_id: response.data.userId,
                    roles: response.data.authorities[0].authority,
                    customer_id: response.data.customer.customerId,
                    customer_firstname: response.data.customer.customerFirstName,
                    customer_lastname: response.data.customer.customerLastName,
                    customer_street_name: response.data.customer.customerStreetName,
                    customer_house_number: response.data.customer.customerHouseNumber,
                    customer_house_number_add: response.data.customer.customerHouseNumberAddition,
                    customer_city: response.data.customer.customerCity,
                    customer_zipcode: response.data.customer.customerZipcode,
                    customer_phone: response.data.customer.customerPhone,
                },
                status: 'done',
            });

        } catch (error) {
            console.error('Er is iets misgegaan', error);
            localStorage.clear();
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ?
                children : <p>ogenblik geduld aub..</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;