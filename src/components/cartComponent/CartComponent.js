import './CartComponent.css';

import React, {useContext, useEffect, useState} from "react";
import {BiMessageError} from "react-icons/bi";
import {IoCloseSharp} from "react-icons/io5";
import {GrDocumentMissing} from "react-icons/gr";
import {CartContext} from "../../context/CartContext";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";

function CartComponent(item) {
    const {state: {cart}, dispatch} = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        setTotalPrice(
            cart.reduce((acc, curr) => acc + Number(curr.productPrice) * curr.qty, 0)
        );
    }, [cart]);

    // const totalPrice = item.reduce((acc, cart) => acc + cart.productPrice, 0);

    return (
        <>
            <div>
                <div className="inner-container">
                    <div className="container-shopping-cart">
                        {cart.length === 0 ?
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
                                                        <IoCloseSharp
                                                            size={20}
                                                            onClick={() => dispatch({
                                                                    type: "REMOVE_FROM_CART",
                                                                    payload: item,
                                                                }
                                                            )
                                                            }
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner"></div>
                                                <div className="cart-container-inner">
                                                    {<img alt={item.fileName}
                                                          src={item.url}
                                                    /> != null ? (<img
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
                                                <div className="cart-container-inner">
                                                    <p>{formatCurrency(item.productPrice)}</p></div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner">Aantal</div>
                                                <div className="cart-container-inner">
                                                    <input
                                                        value={item.qty}
                                                        onChange={(e) =>
                                                            dispatch({
                                                                type: "CHANGE_CART_QTY",
                                                                payload: {
                                                                    id: item.productId,
                                                                    qty: e.target.value,
                                                                }
                                                            })}
                                                        type="number"
                                                        id="item-quantity"
                                                        name="items"
                                                    />
                                                </div>
                                            </div>
                                            <div className="cart-container-outer">
                                                <div className="cart-container-inner">Subtotaal</div>
                                                <div className="cart-container-inner">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="aantal-producten">
                                            Totaal aantal: {cart.length} producten
                                        </div>
                                        <div className="total-price2">
                                            <strong>Totaal prijs: € {totalPrice}</strong>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartComponent;

