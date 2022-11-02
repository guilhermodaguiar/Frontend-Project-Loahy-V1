import React, {useContext} from "react";
import './ShopItem.css';
import {CartContext} from "../../context/CartContext";
import {WishlistContext} from "../../context/WishlistContext";
import {useHistory} from "react-router-dom";
import {HiHeart} from "react-icons/hi";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {BsCartPlusFill, BsFillCartPlusFill} from "react-icons/bs";

function ShopItem2(props) {
    const history = useHistory();

    const {increaseCartQuantity} = useContext(CartContext);
    const {increaseListQuantity} = useContext(WishlistContext);

    function redirect() {
        history.push(`shop/${props.productId}`);
    }


    return(
        <>
            <div className="main-container-product">
                <div className="border-effect-container">
                    <div className="random-robot-container">
                        <div className="wishlist-heart">
                            <HiHeart size={22}
                                     className="add-to-list-heart"
                                     onClick={() => increaseListQuantity(props.product_id)}
                            />
                        </div>
                        <div>
                            <img alt={props.id.fileName}
                                 src={props.id.url}
                            />
                        </div>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            {props.id.productName}
                        </strong>
                        <div className="product-price">
                            € {props.id.productPrice.toFixed(2)}
                            <p>{formatCurrency(props.id.productPrice)}</p>
                        </div>
                        <div className="product-item-inner">
                            <div className="add-item-to-cart">
                                <button className="click-to-cart"
                                        onClick={() => increaseCartQuantity(props.id)}>
                                    <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <span className="product-text">
                    <h3> {props.id.productName} </h3>
                </span>
            </section>
            <section className="product">
                <div className="info-marker-product"
                     onClick={redirect}>
                </div>
                <div className="add-to cart-container-outer">
                    <div className="AddItemsContainer">
                        <div className="buy_plus_button_container">
                            <button type="button"
                                    onClick={increaseCartQuantity}>
                                <BsCartPlusFill size={22}/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopItem2;