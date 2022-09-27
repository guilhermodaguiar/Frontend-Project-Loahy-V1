import React, {useContext, useEffect, useState} from "react";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import './ShoppingCart.css';
import {IoCloseSharp} from "react-icons/io5";
import NavBar from "../../layout/navBar/NavBar";
import {useHistory} from "react-router-dom";


function ShoppingCart(){
    const history = useHistory();
    const [toggleShoppingCart, setToggleShoppingCart] = useState(false);
    const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

    const totalPrice = cart.reduce((acc, cart) => acc + cart.price, 0);

    const removeItem = (index) => {
        setToggleShoppingCart(shoppingCart.filter((o, i) => index !== i));
    };

    function shoppingCart_deliveryRequest() {
        history.push(`/cartitems/checkout`)
    }

    return(
        <>
            <NavBar/>
            <div className="shopping-cart-header">
                <h1 className="shopping-cart-header-name">Winkelwagen</h1>
            </div>
            <div className="content-for-shopping-cart" id="shopping-cart">
                <p>Je winkelwagen is momenteel leeg</p>
                <p>terug naar winkel</p>
            </div>
            <div className="notice -wrapper">
                <fieldset>
                    <form>
                        <table className="shop-table-responsive-cart" cellSpacing="0">
                            <thead>
                            <tr>
                                <th className="product remove"></th>
                                <th className="product-thumbnail"></th>
                                <th className="product-name-name">Product</th>
                                <th className="product-price">Prijs</th>
                                <th className="product-quantity">Aantal</th>
                                <th className="product-subtotal">Subtotaal</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="form-cart-item">
                                <td className="product remove"><IoCloseSharp/></td>
                                <td className="product-thumbnail">thumbnail-image</td>
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
        </>
    )

}

export default ShoppingCart;
