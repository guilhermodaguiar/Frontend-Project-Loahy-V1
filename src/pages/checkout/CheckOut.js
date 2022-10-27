import React, {useContext, useEffect, useState} from "react";
import "./CheckOut.css";
import {NavLink, useHistory} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {AuthContext} from "../../context/AuthContext";
import {CartContext} from "../../context/CartContext";
import {useFormContext} from "react-hook-form";
import axios from "axios";

function CheckOut() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [cart] = useContext(CartContext);
    const totalPrice = cart.reduce((acc, cart) => acc + cart.prijs, 0);

    const {firstname} = useState(user.person_firstname)
    const {lastname} = useState(user.person_lastname)
    const {streetName} = useState(user.person_street_name)
    const {houseNumber} = useState(user.person_house_number)
    const {houseNumberAdd} = useState(user.person_house_number_add)
    const {zipcode} = useState(user.person_zipcode)
    const {city} = useState(user.person_city)

    const {register, formState: {errors}, handleSubmit} = useFormContext();
    const message = "..veld is verplicht";
    const history = useHistory();

    const [productListLong, setProductListLong] = useState([])

    useEffect(() => {
        setProductListLong(cart.map(product => {
            return product.artikelnummer
        }))
    }, [cart])

    async function sendOrder(e) {
        try {
            await axios.post(
                `http://localhost:8080/orders`,
                {
                    productList: productListLong,
                    applier: user.person_id
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                }).then(addedOrder)
        } catch (e) {
            console.error(e.message)
        }
    }

    function addedOrder() {
        history.push(`/order`)
    }

    return (
        <>
            <div>
                <div className="check-out-page">
                    <h1 className="check-out-h1">Checkout</h1>
                </div>



                <div>
                    <button>

                    </button>
                </div>
                <div className="to-shop-link-container">
                    <p className="click-to-shop">
                        Klik&nbsp;<span>
                    <NavLink to="/shop"
                             exact activeClassName="active-link">
                        <FcShop className="shop-icon"
                                size={25}/>
                    </NavLink></span>&nbsp;om verder te winkelen
                    </p>
                </div>
            </div>


        </>
    )
}

export default CheckOut;