import "./CheckoutComponent.css";

import React, {useState} from "react";
import {formatCurrency} from "../../../helpers/formatCurrency/FormatCurrency";


function CheckoutComponentComponent({item, index}) {
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState();



    return(
        <>
            <div className="notice-wrapper">
                <div className="shopping-cart-outer-container">
                    <div className="shopping-cart-new-container">
                        <div className="cart-container-outer">
                            <div className="cart-container-inner">
                                <img alt={item.image.fileName}
                                     className="cart-cartItemImg"
                                     src={item.image.url}
                                />
                            </div>
                        </div>
                        <div className="cart-container-outer">
                            <div className="cart-container-inner">{item.productName}</div>
                        </div>
                        <div className="cart-container-outer">
                            <div className="cart-container-inner">
                                <p>{formatCurrency(item.productPrice)}</p></div>
                        </div>
                        <div className="cart-container-outer">
                            <div className="cart-container-inner">
                                <input
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                    min="1"
                                    max="10"
                                    id="item-quantity"
                                    name="items"
                                />
                            </div>
                        </div>
                        <div className="cart-container-outer">
                            <div className="cart-container-inner">
                                {formatCurrency(item.productPrice * quantity)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutComponentComponent;