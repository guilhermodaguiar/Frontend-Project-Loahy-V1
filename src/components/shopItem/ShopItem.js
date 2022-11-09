import React, {useContext} from "react";
import './ShopItem.css';
import {WishlistContext} from "../../context/WishlistContext";

import {BsFillCartPlusFill} from "react-icons/bs";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {HiHeart} from "react-icons/hi";
import {CartContext} from "../../context/CartContext";

function ShopItem(item) {

    const {increaseCartQuantity} = useContext(CartContext)
    const {increaseListQuantity} = useContext(WishlistContext);


    return (
        <>
            <div className="main-container-product">
                <div className="border-effect-container">
                    <div className="random-robot-container">
                        <div className="wishlist-heart">
                            {}
                            <HiHeart size={22}
                                     className="add-to-list-heart"
                                     onClick={() => {
                                         increaseListQuantity();
                                     }}/>
                        </div>
                        <div>
                            <img alt={item.fileName}
                                 src={item.url}
                            />
                        </div>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            {item.productName}
                        </strong>
                        <div>
                            {item.productDescription}
                        </div>
                        <div>
                            <p>{formatCurrency(item.productPrice)}</p>
                        </div>
                        <div className="product-item-inner">
                            <div className="add-item-to-cart">
                                <button className="click-to-cart"
                                        onClick={() => increaseCartQuantity(item.productId)}>
                                    <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopItem;