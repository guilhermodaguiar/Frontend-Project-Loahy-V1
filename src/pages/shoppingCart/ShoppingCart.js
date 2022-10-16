import React, {useContext, useEffect, useState} from "react";
import shoppingCartContext, {ShoppingCartContext} from "../../context/ShoppingCartContext";
import './ShoppingCart.css';
import {IoCloseSharp} from "react-icons/io5";
import {NavLink, useHistory} from "react-router-dom";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import {AuthContext} from "../../context/AuthContext";
import {GrDocumentMissing} from "react-icons/gr";
import {CartContext} from "../../context/CartContext";



function ShoppingCart() {

    const history = useHistory();

    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext)

    const cartQuantity = 2;

    function removeFromCart() {
        return null;
    }

    useEffect(() => {

    }, []);



    function shoppingCart_deliveryRequest() {
        history.push(`/shopping-cart/checkout`)
    }

    return(
        <>
            <div>
                <ScrollIndicator/>
                <ScrollToTop/>
                <div className="shopping-cart-page">
                    <h1 className="shopping-cart-h1">Winkelwagen</h1>
                </div>
                <div className="shopping-cart-container">
                    <div className="inner-container">
                        <div className="container-shopping-cart">
                            { cartQuantity === 0 && (<div className="content-for-shopping-cart" id="shopping-cart">
                                <p>Je winkelwagen is momenteel leeg</p>
                                <div>
                                    <p className="click-to-homepage">Klik <span><NavLink to="/" exact activeClassName="active-link">hier</NavLink></span> om terug te gaan naar de winkel
                                    </p>
                                </div>
                            </div>)}
                            <div className="notice-wrapper">
                                <fieldset className="field-set-shopping-cart">
                                    <form>
                                        <table className="shop-table-responsive-cart" cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th className="product-remove"></th>
                                                <th className="product-thumbnail"></th>
                                                <th className="product-name-name">Product</th>
                                                <th className="product-price">Prijs</th>
                                                <th className="product-quantity">Aantal</th>
                                                <th className="product-subtotal">Subtotaal</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr className="form-cart-item">
                                                <td className="product-remove"><IoCloseSharp size={26} onClick={removeFromCart}/></td>
                                                <td className="product-thumbnail">{products.image != null ? (products.image) : <GrDocumentMissing size={30}/> }</td>
                                                <td className="product-name-name">product-naam</td>
                                                <td className="product-price">product prijs</td>
                                                <td className="product-quantity">
                                                    <input
                                                        type="number"
                                                        id="quantity"
                                                        className="product-quantity"
                                                        value="1"
                                                        title="Aantal"
                                                        inputMode="numeric"
                                                        autoComplete="off"
                                                    />
                                                </td>
                                                <td className="product-subtotal"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </fieldset>
                            </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )

}

export default ShoppingCart;
