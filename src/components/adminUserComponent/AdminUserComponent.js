import React, {useContext, useEffect, useState} from "react";
import axios from "axios";




import {AuthContext} from "../../context/AuthContext";

function AdminUserComponent() {

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
                const response = await axios.get(`http://localhost:8080/users`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setUsers(response.data)

            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e);
            }
        }
        fetchUsers();

        return function cleanup() {
            token.cancel();
        }

    }, [token, users]);


    return(
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                    <div className="admin-route-container">
                        <div className="admin-route">
                            <h1>U moet ingelogd zijn als
                                <br/> ADMINISTRATOR
                                <br/>om deze content te mogen zien..
                            </h1>
                        </div>
                    </div>
                )
                :
                (
                    <div className="users-page-admin-element" id="all-customers">

                        <section className="Admin_UsersComponent">
                            <div>
                                <h2> GEBRUIKERS </h2>
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Gebruikers-Id</th>
                                    <th>E-mail</th>
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
                                                    onClick={() => deleteUser(user.username)}>
                                            </button>
                                        </td>
                                        <td>{user.userId}</td>
                                        <td>{user.userEmail}</td>
                                        <td>{user.customer.customerFirstName}</td>
                                        <td>{user.customer.customerLastName}</td>
                                        <td>{user.customer.customerStreetName}</td>
                                        <td>{user.customer.customerHouseNumber}</td>
                                        <td>{user.customer.customerHouseNumberAddition}</td>
                                        <td>{user.customer.customerZipcode}</td>
                                        <td>{user.customer.customerCity}</td>
                                        <td>{user.customer.customerPhone}</td>
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

export default AdminUserComponent;