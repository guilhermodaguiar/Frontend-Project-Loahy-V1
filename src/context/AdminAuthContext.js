import React, {createContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from "axios";


export const AdminAuthContext = createContext({});

function AdminAuthContextProvider({ children }) {
    const history = useHistory();
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status:'pending',
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        //console.log(token);
        if(token) {
            const decodedToken = jwt_decode(token);
            fetchAdminData(decodedToken.sub, token);
        } else {
            toggleAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(JWT) {
        //1. Zet de token in de localStorage
        localStorage.setItem('token', JWT);
        //2. Haal, indien nodig, de gebruikersgegevens uit de backend op:
        // async function getData() {
        //};

        const decodedToken = jwt_decode(JWT);
        console.log(decodedToken);

        fetchAdminData(decodedToken.sub, JWT, '/admin/profile');
    }

    function logout() {
        localStorage.clear();
        toggleAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });

        console.log('De admin is uitgelogd!');
        history.push('/admin')
    }

    async function fetchAdminData(id, token, redirectUrl) {
        try {
            const response = await axios.get(`http://localhost:3000/660/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            toggleAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: 'done',
            })

            if(redirectUrl) {
                history.push(redirectUrl);
            }
        } catch (e) {
            console.error(e);
            toggleAuth({
                ...auth,
                status: 'done',
            });
        }
    }

    const adminData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };


    return (
        <AdminAuthContext.Provider value={adminData}>
            {auth.status === 'done'? children : <p>Loading...</p>}
        </AdminAuthContext.Provider>
    );
}

export default AdminAuthContextProvider;