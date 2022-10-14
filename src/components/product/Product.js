import React, {useContext} from "react";
import './Product.css';
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import {WishlistContext} from "../../context/WishlistContext";
import { useHistory } from "react-router-dom";

import { BsCartPlusFill } from "react-icons/bs";
import {TbHeartPlus} from "react-icons/tb";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";

function Product(props) {

    const history = useHistory();

    const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);
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
            setShoppingCart([...wishlist, {...product, qty: 1}]);
        }
        localStorage.setItem(wishlist, JSON.stringify(wishlist));
    }


    function redirect() {
        history.push(`shop/${props.productId}`);
    }

    return (
        <>
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

                <div className="container-ImageButton">
                    <div className="product-image">
                        <img alt={props.fileName} src={props.url}/>
                    </div>
                </div>

                <span className="container-TextPrice">
                         <span className="product-price">
                             <p> € {props.productPrice.toFixed(2)} </p>
                             <p>{formatCurrency(props.productPrice)}</p>
                         </span>
                </span>
            </section>
        </>
    )
}

export default Product;