import "./AdminProfile.css";
import React, {useContext, useEffect, useState} from 'react';
import { AuthContext} from "/src/context/AuthContext";
import axios from "axios";



function AdminProfile() {

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [adminData, setAdminData] = useState({});

    useEffect(() =>{
        async function fetchAdminData() {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8080/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAdminData(response.data)
            } catch (e) {
                console.error(e);
            }
        }

        fetchAdminData();

        return function cleanup() {
            token.cancel();
        }
    }, [token])




    return (
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
            ) : (
                <section id="admin-profile">
                    <h2>Gegevens</h2>
                    <p><strong>Gebruikersnaam</strong> {user.userName}</p>
                    <p><strong>Email:</strong>{user.userEmail}</p>
                </section>
            )}
            <div>



                {Object.keys(users).length > 0 &&
                    <section>
                        <h2>Strikt geheime admin-content</h2>
                        <h3>{users.title}</h3>
                        <p>{users.content}</p>
                    </section>}
                <section className="admin-field">


                    <div className="open-orders" id="open-orders">Open Orders
                        <form>
                            <table>
                                <thead>
                                <tr>
                                    <th className="client_id">klant-id</th>
                                    <th className="order_nummer">order-nummer</th>
                                    <th className="order_field"></th>
                                    <th className="handle_order"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th className="client_id">klant-id</th>
                                    <th className="order_nummer">order-nummer</th>
                                    <th className="order_field">Back-end_data met product, en aantal en subtotaal</th>
                                    <th className="handle_order">verwerk button met ja en nee en wanneer verwerkt moet het het naar een link gaan naar email adres </th>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>



                </section>
                <section>
                    <p> hier uitloggen</p>
                    <button type="button" onClick={ user.logout }>
                        Uitloggen
                    </button>
                </section>
            </div>
        </>

    );
}

export default AdminProfile;