import React, {useContext, useEffect, useState} from "react";
import "./CheckOut.css";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {FaShoppingCart} from "react-icons/fa";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useCart} from "../../context/CartContext";

function CheckOut() {
    const token = localStorage.getItem('token');
    const cartItems = useCart();

    const totalPrice = cartItems.reduce((acc, cart) => acc + cart.prijs, 0);

    const {isAuth, user} = useContext(AuthContext);
    // const {firstname} = useState(user.customer_firstname);
    // const {lastname} = useState(user.customer_lastname);
    // const {streetName} = useState(user.customer_street_name);
    // const {houseNumber} = useState(user.customer_house_number);
    // const {houseNumberAdd} = useState(user.customer_house_number_add);
    // const {zipcode} = useState(user.customer_zipcode)
    // const {city} = useState(user.customer_city);
    // const {phone} = useState(user.customer_phone);

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        setItemList(cartItems.map(product => {
            return product.product_id
        }))
    }, [cartItems])


    async function sendOrder() {
        try {
            await axios.post(`http://localhost:8080/order`, {
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


    return (
        <>
            <div className="check-out-page">
                <h1 className="check-out-h1">Checkout</h1>
            </div>
            {!isAuth ?
                (
                    <>
                      <div>
                          <p>login om om uit te checken</p>
                          <p></p>

                      </div>
                    </>
                ): (
                <div>
                    <div>
                        {/*<div>hier komt je lijst van bestelde artikelen</div>*/}
                        {/*<div>hier komen je gegevens*/}
                        {/*    <div>*/}
                        {/*        <div>*/}
                        {/*            <h1>Gebruikersgegevens:</h1>*/}
                        {/*        </div>*/}
                        {/*        {firstname} {lastname}*/}
                        {/*        {streetName} {houseNumber} {houseNumberAdd}*/}
                        {/*        {zipcode} {city} {phone}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div>
                        <form className="check-cart-checkout"
                              onSubmit={sendOrder}
                        >
                        </form>
                    </div>
                </div>
                )}


            <div className="checkout-out-outer-container">
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
                        </span>&nbsp;om terug naar je winkelwagen te gaan
                    </p>
                </div>
            </div>


        </>
    )
}

export default CheckOut;