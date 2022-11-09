import './CartComponent.css';

import React, {useContext} from "react";
import {BiMessageError} from "react-icons/bi";
import {CartContext} from "../../context/CartContext";
import {IoCloseSharp} from "react-icons/io5";
import {GrDocumentMissing} from "react-icons/gr";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";

function CartComponent(item) {
    const {
        cartItems,
        cartQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useContext(CartContext);


    const totalPrice = cartItems.reduce((acc, cart) => acc + cart.productPrice, 0);


    return (
        <>
            <div>
                <div className="inner-container">
                    <div className="container-shopping-cart">
                        {cartQuantity === 0 ?
                            (<div className="content-for-shopping-cart" id="shopping-cart">
                                <p className="click-to-shop">Je winkelwagen is
                                    momenteel leeg&nbsp;<BiMessageError size={30}/></p>
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
                                                                      onClick={removeFromCart()}/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner"></div>
                                                <div className="cart-container-inner">
                                                    {<img alt={item.fileName}
                                                          src={item.url}
                                                    />!= null ? (<img
                                                        alt={item.fileName}
                                                        src={item.url}/>) :
                                                        <GrDocumentMissing size={30}/>}</div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner">Naam</div>
                                                <div className="cart-container-inner">{item.productName}</div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner">Prijs</div>
                                                <div className="cart-container-inner">{item.productName}</div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner"></div>
                                                <div className="cart-container-inner">
                                                    <div className="plus-minus-button-container">
                                                        <button className="increase-item">
                                                            <AiFillPlusCircle
                                                                size={12}
                                                                onClick={increaseCartQuantity()}
                                                            />
                                                        </button>
                                                        <button className="decrease-item">
                                                            <AiFillMinusCircle
                                                                size={12}
                                                                onClick={decreaseCartQuantity()}
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
                                                    {/*€ {item.productPrice.toFixed(2)}*/}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="total-price2">
                                            <strong>Totaal prijs: € {totalPrice.toFixed(2)}</strong>
                                        </div>
                                    </div>
                                </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartComponent;

