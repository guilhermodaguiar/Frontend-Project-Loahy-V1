import React, {useContext} from "react";
import './ShopItem.css';

import {BsFillCartDashFill, BsFillCartPlusFill} from "react-icons/bs";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {HiHeart} from "react-icons/hi";
import {CartContext} from "../../context/CartContext";
import {WishlistContext} from "../../context/WishlistContext";

function ShopItem(item, wishlistItem) {
    const {state: {cart}, dispatch,} = useContext(CartContext);
    const {dispatch2} = useContext(WishlistContext);

    return (
        <>
            <div className="main-container-product">
                <div className="border-effect-container">
                    <div className="random-robot-container">
                        <div className="wishlist-heart">
                            <HiHeart size={22}
                                     className="add-to-list-heart"
                                     onClick={() => dispatch2({
                                         type: 'ADD_TO_WISHLIST',
                                         payload: wishlistItem,
                                     })
                                     }/>
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
                            {cart.some((p) => p.id === item.productId) ?
                                (<div className="remove-item-from-cart">
                                    <button className="click-from-cart"
                                            onClick={() => dispatch({
                                                type: 'REMOVE_FROM_CART',
                                                payload: item,
                                            })}>
                                        <p><BsFillCartDashFill/> &nbsp;Uit winkelwagen</p>
                                    </button>
                                </div>)
                                :
                                (<div className="add-item-to-cart">
                                    <button className="click-to-cart"
                                            onClick={() => dispatch({
                                                type: 'ADD_TO-CART',
                                                payload: item,
                                            })}>
                                        <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                                    </button>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopItem;