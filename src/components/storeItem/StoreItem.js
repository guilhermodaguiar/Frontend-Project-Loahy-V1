import React, {useContext} from "react";
import './StoreItem.css';
import {WishlistContext} from "../../context/WishlistContext";
import {useHistory} from "react-router-dom";

import {BsCartPlusFill, BsFillCartPlusFill} from "react-icons/bs";
import {TbHeartPlus} from "react-icons/tb";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {HiHeart} from "react-icons/hi";
import {CartContext} from "../../context/CartContext";

function StoreItem(props) {

    const history = useHistory();

    const [shoppingCart, setShoppingCart] = useContext(CartContext);
    const [wishlist, setWishlist] = useContext(WishlistContext);


    function addToShoppingCart() {
        const product = {
            product_id: props.productId,
            product_name: props.productName,
            product_price: props.productPrice,
            product_url: props.url
        }

        const exists = shoppingCart.find((x) => x.id === product.product_id);
        if (exists) {
            setShoppingCart(
                shoppingCart.map((x, index) =>

                    x.id === product.product_id ? {...exists, qty: exists.qty + 1} : x
                )
            );
        } else {
            setShoppingCart([...shoppingCart, {...product, qty: 1}]);
        }
        localStorage.setItem(shoppingCart, JSON.stringify(shoppingCart));
    }

    function addToWishlist() {
        const product = {
            product_id: props.productId,
            product_name: props.productName,
            product_url: props.url
        }

        const exists = wishlist.find((x) => x.id === product.product_id);
        if (exists) {
            setWishlist(
                wishlist.map((x, index) =>

                    x.id === product.product_id ? {...exists, qty: exists.qty + 1} : x
                )
            );
        } else {
            setWishlist([...wishlist, {...product, qty: 1}]);
        }
        localStorage.setItem(wishlist, JSON.stringify(wishlist));
    }


    function redirect() {
        history.push(`shop/${props.productId}`);
    }

    return (
        <>
            <div className="main-container-product">
                <div className="border-effect-container">
                    <div className="random-robot-container">
                        <div className="wishlist-heart">
                            {}
                            <HiHeart size={22}
                                     onClick={() => {
                                         addToWishlist(props.product_id)
                                     }}/>
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
                                        onClick={() => addToShoppingCart({props})}>
                                    <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                                </button>
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
                                    onClick={addToShoppingCart}>
                                <BsCartPlusFill size={22}/>
                            </button>
                        </div>
                    </div>
                </div>
                {/*Als wishlist leeg is moet het naar "/login/registreer gaan
                - of een login component komen???*/}
                <div className="AddItemsToWishlistContainer-container">
                    <div className="Add-items-to-wishlist-container">

                        <div className="heart_button_container">
                            <button
                                type="button"
                                onClick={addToWishlist}>
                                <TbHeartPlus size={22}/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default StoreItem;