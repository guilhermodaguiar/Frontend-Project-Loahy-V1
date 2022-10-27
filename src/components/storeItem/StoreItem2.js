import React, {useContext} from "react";
import './StoreItem.css';
import {CartContext} from "../../context/CartContext";
import {WishlistContext} from "../../context/WishlistContext";
import {useHistory} from "react-router-dom";
import {HiHeart} from "react-icons/hi";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {BsCartPlusFill, BsFillCartPlusFill} from "react-icons/bs";

function StoreItem2({props}) {
    const history = useHistory();

    const {increaseCartQuantity} = useContext(CartContext);
    const {addToWishlist} = useContext(WishlistContext);
    const product = {
        product_id: props.productId,
        product_name: props.productName,
        product_price: props.productPrice,
        product_url: props.url}

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
                                     onClick={() => addToWishlist(props.productId)}
                            />
                        </div>
                        <div>
                            <img alt={props.fileName}
                                 src={props.url}
                            />
                        </div>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            {props.productName}
                        </strong>
                        <div className="product-price">
                            € {props.productPrice.toFixed(2)}
                            <p>{formatCurrency(props.productPrice)}</p>
                        </div>
                        <div className="product-item-inner">
                            <div className="add-item-to-cart">
                                <button className="click-to-cart"
                                        onClick={() => increaseCartQuantity({props})}>
                                    <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                                </button>
                                {/*    hier komt functie om naar cart toe te voegen*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <span className="product-text">
                    <h3> {props.productName} </h3>
                </span>
            </section>
            <section className="product">
                <div className="info-marker-product"
                     onClick={redirect}>
                </div>
                <div className="AddItemsContainer-container">
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

export default StoreItem2;