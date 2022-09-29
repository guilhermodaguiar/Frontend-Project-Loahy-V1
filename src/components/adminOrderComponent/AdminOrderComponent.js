import React, {useContext, useEffect, useState} from "react";

import './AdminOrderComponent.css';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function AdminOrderComponent() {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);

    const[orders, setOrders] = useState([])

    useEffect(() => {

        async function fetchOrders() {

            try {
                const response = await axios.get(`http://localhost:8080/orders`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
                );
                setOrders(response.data)

            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e);
            }
        }
        fetchOrders();

        return function cleanup() {
            token.cancel();
        }

    }, [orders, token]);

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
                )
                :
                (
            <div className="history-orders" id="all-orders">History Orders
                <section>
                    <table>
                        <thead>
                        <tr>
                            <th className="client_id">Klant-id</th>
                            <th className="order_nummer">order-nummer</th>
                            <th className="order_field"></th>
                        </tr>
                        </thead>
                        <tbody className="order_tbody">

                        {orders.map((order) => {
                            return <tr key = {order.orderId}></tr>
                        })}
                            <tr>
                                <th className="client_id">{}</th>
                                <th className="order_nummer">order-nummer</th>
                                <th className="order_field">Back-end_data met product, en aantal en subtotaal</th>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>)}
        </>
    )
}

export default AdminOrderComponent;