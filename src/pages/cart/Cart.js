import React, {useContext, useEffect, useState} from "react";
import './Cart.css';
import {NavLink, useHistory} from "react-router-dom";
import axios from "axios";
import {IoBagCheckOutline, IoCloseSharp} from "react-icons/io5";
import {GrDocumentMissing} from "react-icons/gr";
import {CartContext} from "../../context/CartContext";
import {FcShop} from "react-icons/fc";
import {BiMessageError} from "react-icons/bi";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {AuthContext} from "../../context/AuthContext";


function Cart() {
    const history = useHistory();
    const {isAuth} = useContext(AuthContext);

    // const {cartItems} = useContext(cartContext);
    const {cartQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useContext(CartContext);
    const [cartItems, setCartItems] = useState([]);
    const totalPrice = cartItems.reduce((acc, cart) => acc + cart.productPrice, 0);


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8080/products', {cancelToken: source.token});
                console.log(response.data);
                setCartItems(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchProducts();
        return function cleanup() {
            console.log(`We gaan eraan!!`);
            source.cancel();
        }
    }, []);

    function checkout() {
        history.push('customer/checkout');
    }


    return <>
        <div>
            <div className="shopping-cart-page">
                <h1 className="shopping-cart-h1">Winkelwagen</h1>
            </div>
            <div className="shopping-cart-container">
                <div className="inner-container">
                    <div className="container-shopping-cart">
                        {cartQuantity === 0 ?
                            (<div className="content-for-shopping-cart" id="shopping-cart">
                                <p className="click-to-shop">Je winkelwagen is
                                    momenteel leeg&nbsp;<BiMessageError size={30}/></p>
                                <div className="to-shop-link-container">
                                    <p className="click-to-shop">
                                        Klik&nbsp;<span><NavLink to="/shop"
                                                                 exact activeClassName="active-link"><FcShop
                                        className="shop-icon"
                                        size={25}/></NavLink></span>&nbsp;om terug te gaan de Loahy Shop
                                    </p>
                                </div>
                            </div>)
                            :
                            (
                                <div className="notice-wrapper">
                                    <div className="shopping-cart-outer-container">
                                        <div className="shopping-cart-new-container">
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner"></div>
                                                <div className="cart-container-inner"
                                                >
                                                    <button className="remove-from-cart-button">
                                                        <IoCloseSharp size={20}
                                                                      onClick={removeFromCart}/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner"></div>
                                                <div className="cart-container-inner">
                                                    {cartItems.image != null ? (cartItems.image) :
                                                        <GrDocumentMissing size={30}/>}</div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner">Naam</div>
                                                <div className="cart-container-inner"></div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner">Prijs</div>
                                                <div className="cart-container-inner"></div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner"></div>
                                                <div className="cart-container-inner">
                                                    <div className="plus-minus-button-container">
                                                        <button className="increase-item">
                                                            <AiFillPlusCircle
                                                                size={12}
                                                                onClick={increaseCartQuantity}
                                                            />
                                                        </button>
                                                        <button className="decrease-item">
                                                            <AiFillMinusCircle
                                                                size={12}
                                                                onClick={decreaseCartQuantity}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner">Aantal</div>
                                                <div className="cart-container-inner">{cartQuantity}</div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner">Subtotaal</div>
                                                <div className="cart-container-inner">
                                                    {/*€ {cartItems.productPrice.toFixed(2)}*/}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="total-price2">
                                            <strong>Totaal prijs: € {totalPrice.toFixed(2)}</strong>
                                        </div>
                                    </div>

                                    { !isAuth ? (
                                        <div>
                                            <div>
                                                <div className="warning-icon"><BiMessageError size={40}/></div>
                                                <p className="click-to-shop"> Je moet ingelogd zijn om bestellen</p>
                                                <p className="click-to-shop"> Klik&nbsp;
                                                    <NavLink to="/customer/register" exact activeClassName="active-link">
                                                        <p className="click-p">hier</p>
                                                    </NavLink>
                                                    &nbsp;om te registreren
                                                </p>

                                                <p className="click-to-shop"> Klik&nbsp;
                                                    <NavLink to="/customer" exact activeClassName="active-link"><p
                                                        className="click-p">hier</p></NavLink>
                                                    &nbsp;om in te loggen
                                                </p>

                                                <div className="to-shop-link-container">
                                                    <p className="click-to-shop">
                                                        Klik&nbsp;
                                                        <span>
                                        <NavLink to="/shop"
                                                 exact activeClassName="active-link">
                                            <FcShop className="shop-icon"
                                                    size={25}/>
                                        </NavLink>
                                </span>&nbsp;om verder te winkelen
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        ) : (
                                            <div className="button-size">
                                                <button className="cart-checkout-button"
                                                        onClick={checkout}>
                                                    <IoBagCheckOutline size={22}/>&nbsp;Bestellen
                                                </button>
                                            </div>
                                        )}
                                    {cartQuantity !== 0 && (<div className="click-to-buy-container">
                                        <div className="to-shop-link-container">
                                            <p className="click-to-shop">
                                                Klik&nbsp;<span>
                                        <NavLink to="/shop"
                                                 exact activeClassName="active-link">
                                            <FcShop className="shop-icon" size={25}/>
                                        </NavLink></span>&nbsp;om verder te winkelen
                                            </p>
                                        </div>
                                    </div>)}
                                </div>)}
                    </div>
                </div>
            </div>
        </div>
    </>

}


export default Cart;
