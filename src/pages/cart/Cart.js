import React, {useContext} from "react";
import './Cart.css';
import {BiMessageError} from "react-icons/bi";
import {NavLink, useHistory} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {IoBagCheckOutline} from "react-icons/io5";
import {AuthContext} from "../../context/AuthContext";
import {CartContext} from "../../context/CartContext";
import CartComponent from "../../components/cartComponent/CartComponent";


function Cart() {
    const {isAuth} = useContext(AuthContext);
    const history = useHistory();
    const {cartItems} = useContext(CartContext);


    function checkout() {
        history.push('customer/checkout');
    }


    return <>
        <div>
            <div className="shopping-cart-page">
                <h1 className="shopping-cart-h1">Winkelwagen</h1>
            </div>
            <div className="shopping-cart-container">
                {cartItems.map((item) => {
                    return <CartComponent
                        key={item.productId}

                        url={item.image.url}
                        fileName={item.image.fileName}

                        productId={item.productId}
                        productName={item.productName}
                        productPrice={item.productPrice}
                    />
                })}

                {cartItems.map(item => (
                    <CartComponent key={item.productId} {...item} />
                ))}
            </div>
            <div className={"shopping-cart-container"}>
                {!isAuth ? (
                    <div>
                        <div>
                            <div className="warning-icon"><BiMessageError size={40}/></div>
                            <p className="click-to-shop"> Je moet ingelogd zijn om bestellen</p>
                            <p className="click-to-shop"> Klik&nbsp;
                                <NavLink to="/customer/register">
                                    <p className="click-p">hier</p>
                                </NavLink>
                                &nbsp;om te registreren
                            </p>

                            <p className="click-to-shop"> Klik&nbsp;
                                <NavLink to="/customer"><p
                                    className="click-p">hier</p></NavLink>
                                &nbsp;om in te loggen
                            </p>

                            <div className="to-shop-link-container">
                                <p className="click-to-shop">
                                    Klik&nbsp;
                                    <span>
                                        <NavLink to="/shop">
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
            </div>


        </div>
    </>

}


export default Cart;
