import "./CheckOut.css";

import React, {useContext, useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {FaShoppingCart} from "react-icons/fa";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useCart} from "../../context/CartContext";
import {MdLocalShipping} from "react-icons/md";
import {BsFillPencilFill} from "react-icons/bs";
import Cart from "../cart/Cart";
import CartDropDown from "../../components/cartDropDownMenu/CartDropDown";
import OrderCartComponent from "./orderCartComponent/OrderCartComponent";

function CheckOut() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const cartItems = useCart();
    const {
        isAuth, user,
        user: {
            customer_firstname, customer_lastname,
            customer_street_name, customer_house_number,
            customer_house_number_add, customer_city,
            customer_zipcode, customer_phone,
        }
    } = useContext(AuthContext);

    const [itemList, setItemList] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [houseNumberAdd, setHouseNumberAdd] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState();

    useEffect(() => {
        setItemList(cartItems.map(product => {
            return product.product_id
        }))
    }, [cartItems])

    async function sendOrder() {
        try {
            await axios.post(`http://localhost:8080/order/create`, {
                products: itemList,
                userId: user.customer_id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error(e);
        }
    }

    async function handleUpdateCustomer(id) {
        try {
            await axios.put(`http://localhost:8080/customer/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    customerFirstName: firstName,
                    customerLastName: lastName,
                    customerStreetName: street,
                    customerHouseNumber: houseNumber,
                    customerHouseNumberAddition: houseNumberAdd,
                    customerCity: city,
                    customerZipcode: zipcode,
                    customerPhone: phone,
                }).then(updatedCustomer);
        } catch (e) {
            console.error(e);
        }
    }

    function updatedCustomer() {
        history.push('/customer/checkout')
    }


    return (
        <>
            {/*{(user.roles !== "ROLE_USER") ? (*/}
            {/*    <div className="user-route-container">*/}
            {/*        <div className="user-route">*/}
            {/*            <h1>U moet ingelogd zijn als*/}
            {/*                <br/> CUSTOMER*/}
            {/*                <br/>om deze content te mogen zien..*/}
            {/*            </h1>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*) : (*/}

            <div className="check-out-page">
                <h1 className="check-out-h1">Checkout</h1>
            </div>
            <div className="checkout-out-outer-container">
                <div className="first-box-container">
                    <div className="shipping-information-container">
                        <h3><MdLocalShipping size={25}/>Verzend gegevens</h3>
                        <div className="info-container">
                            <div><strong>Voornaam:</strong> {customer_firstname}</div>
                            <div><strong>Achternaam:</strong> {customer_lastname}</div>
                            <div><strong>Straat:</strong> {customer_street_name}</div>
                            <div><strong>Huisnr:</strong> {customer_house_number}</div>
                            <div><strong>toevoeging:</strong> {customer_house_number_add}</div>
                            <div><strong>postcode:</strong> {customer_zipcode} </div>
                            <div><strong>Stad:</strong> {customer_city}</div>
                            <div><strong>Mobiel nummer:</strong> {customer_phone}</div>
                        </div>
                    </div>
                    <div className="shipping-update-list">
                        <section>
                            <h3>Kies een ander verzendadres</h3>
                            <div>
                                <form
                                    className="shipping-form"
                                    onSubmit={handleUpdateCustomer}>

                                    <section className="update-customer-info">
                                        <label>
                                            <strong>Voornaam:</strong>
                                        </label>
                                        <input
                                            className="input-order"
                                            type="text"
                                            id="firstname"
                                            autoComplete="off"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            required
                                        />
                                    </section>

                                    <section className="update-customer-info">
                                        <label>
                                            <strong>Achternaam:</strong>
                                        </label>
                                        <input
                                            className="input-order"
                                            type="text"
                                            id="lastname"
                                            autoComplete="off"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            required
                                        />
                                    </section>

                                    <section className="update-customer-info">
                                        <label>
                                            <strong>Straatnaam:</strong>
                                        </label>
                                        <input
                                            className="input-order"
                                            type="text"
                                            id="street-name"
                                            autoComplete="off"
                                            onChange={(e) => setStreet(e.target.value)}
                                            value={street}
                                            required
                                        />
                                    </section>

                                    <section className="update-customer-info">
                                        <label>
                                            <strong>Huisnummer:</strong>
                                        </label>
                                        <input
                                            className="input-order"
                                            type="text"
                                            id="house-number"
                                            autoComplete="off"
                                            onChange={(e) => setHouseNumber(e.target.value)}
                                            value={houseNumber}
                                            required
                                        />
                                    </section>

                                    <section className="update-customer-info">
                                        <label>
                                            <strong>Tvg:</strong>
                                        </label>
                                        <input
                                            className="input-order"
                                            type="text"
                                            id="house-number-add"
                                            autoComplete="off"
                                            onChange={(e) => setHouseNumberAdd(e.target.value)}
                                            value={houseNumberAdd}
                                            placeholder="niet verplicht"
                                        />
                                    </section>

                                    <section className="update-customer-info">
                                        <label>
                                            <strong>Postcode:</strong>
                                        </label>
                                        <input
                                            className="input-order"
                                            type="text"
                                            id="zipcode"
                                            autoComplete="off"
                                            onChange={(e) => setZipcode(e.target.value)}
                                            value={zipcode}
                                            required
                                        />
                                    </section>

                                    <section className="update-customer-info">
                                        <label>
                                            <strong>Stad:</strong>
                                        </label>
                                        <input
                                            className="input-order"
                                            type="text"
                                            id="city"
                                            autoComplete="off"
                                            onChange={(e) => setCity(e.target.value)}
                                            value={city}
                                            required
                                        />
                                    </section>

                                    <section className="update-customer-info">
                                        <label>
                                            <strong>Mobiel:</strong>
                                        </label>
                                        <input
                                            className="input-order"
                                            type="tel"
                                            id="phone-number"
                                            autoComplete="off"
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                            required
                                        />
                                    </section>
                                    <button
                                        type="submit"
                                        className="form-button"
                                    >
                                        <BsFillPencilFill/>&nbsp; Wijzigen
                                    </button>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div className="got-to-container">
                    <div className="to-shop-link-container">
                        <p className="click-to-shop">
                            Klik&nbsp;<span>
                            <NavLink to="/shop">
                                <FcShop className="shop-icon" size={25}/>
                            </NavLink>
                        </span>&nbsp;om naar de shop te gaan
                        </p>
                    </div>
                    <div className="to-shop-link-container">
                        <p className="click-to-shop">
                            Klik&nbsp;<span>
                            <NavLink to="/shopping-cart">
                                <FaShoppingCart className="cart-icon" size={22}/>
                            </NavLink>
                        </span>&nbsp;om naar winkelwagen te gaan
                        </p>
                    </div>
                </div>
                </div>

                <div className="shopping-cart-list-container">
                    <OrderCartComponent/>
                    <form
                        className="check-cart-checkout"
                        onSubmit={sendOrder}
                    >
                        <button
                            type="submit"
                            className="form-button"
                        >
                            Order
                        </button>

                    </form>
                </div>

            </div>
        </>
    )
}

export default CheckOut;