import "./AdminUser.css"

import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {FaUserCircle} from "react-icons/fa";

function AdminUser() {

    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    async function deleteUser(userEmail) {
        try {
            await axios.delete(`http://localhost:8080/users/delete/${userEmail}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(`http://localhost:8080/users/all`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setUsers(response.data)
            } catch (e) {
                console.error('Er is iets misgegaan!', e);
            }
        }
        fetchUsers();
    }, [users]);


    return(
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                <div className="admin-route-container">
                    <div className="admin-route">
                        <h1>Moet ingelogd zijn als Admin</h1>
                    </div>
                </div>
                )
                :
                (
                    <div className="users-page-admin-element" id="all_customers">

                        <section className="Admin_UsersComponent">
                            <div>
                                <h2> Users&nbsp;<FaUserCircle/> </h2>
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>user-Id</th>
                                    <th>e-mail</th>
                                    <th>Voornaam</th>
                                    <th>Achternaam</th>
                                    <th>Straatnaam</th>
                                    <th>Huisnummer</th>
                                    <th>Toevoeging</th>
                                    <th>Postcode</th>
                                    <th>Woonplaats</th>
                                    <th>Telefoon</th>
                                </tr>
                                </thead>

                                <tbody className="admin_tbody">

                                {users.map((user) => {
                                    return <tr key={user.userId}>
                                        <td>
                                            <button className="delete-button"
                                                    onClick={() => deleteUser(user.userEmail)}>
                                            </button>
                                        </td>
                                        <td>{user.userId}</td>
                                        <td>{user.userEmail}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </section>
                    </div>
                )}
        </>
    )
}

export default AdminUser;