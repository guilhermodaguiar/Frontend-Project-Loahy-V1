import './AdminOrder.css';

import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {IoCloseCircleSharp} from "react-icons/io5";
import {FaRegListAlt} from "react-icons/fa";
import {useHistory} from "react-router-dom";

function AdminOrder() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get(`http://localhost:8080/orders/all`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setOrders(response.data);
                console.log(response.data);
            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e);
            }
        }

        fetchOrders();
    }, [token]);
    async function deleteOrder(orderId) {
        try {
            await axios.delete(`http://localhost:8080/users/delete/${orderId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
        } catch (e) {
            console.error(e);
        }
        setTimeout(() => {
            history.push("/admin/profile");
        }, 300);
    }


    return (
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                    <div className="admin-route-container">
                        <div className="admin-route">
                            <h1>Moet ingelogd zijn als Admin</h1>
                        </div>
                    </div>
                )
                :
                (<div className="history-orders" id="all_orders">
                    <section>
                        <div>
                            <h2>
                                Orders&nbsp;<FaRegListAlt/>
                            </h2>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th className="delete-container">Verwijder</th>
                                <th className="client_name">naam</th>
                                <th className="client-last-name">Achternaam</th>
                                <th className="order_number">order#</th>
                                <th className="order_field"></th>
                            </tr>
                            </thead>
                            <tbody className="order_tbody">

                            {orders.map((order) => {
                                return <tr key={order.orderId}>
                                    <td>
                                        <button className="delete-button">
                                            <IoCloseCircleSharp
                                                size={20}
                                                onClick={() => deleteOrder(order.orderId)}
                                            />
                                        </button>
                                    </td>
                                    <td className="client_first-name">{order.userFirstName}</td>
                                    <td className="client-last-name"></td>
                                    <td className="order_number">{order.orderId}</td>
                                    <td className="order_field">Back-end_data met product, en aantal en subtotaal
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </section>
                </div>)}
        </>
    )
}

export default AdminOrder;