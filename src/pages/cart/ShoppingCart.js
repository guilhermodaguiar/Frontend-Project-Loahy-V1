import React, {useContext, useEffect, useState} from "react";
import './ShoppingCart.css';
import {NavLink, useHistory} from "react-router-dom";
import axios from "axios";
import {IoBagCheckOutline, IoCloseSharp} from "react-icons/io5";
import {GrDocumentMissing} from "react-icons/gr";
import {CartContext} from "../../context/CartContext";
import {FcShop} from "react-icons/fc";
import {BiMessageError} from "react-icons/bi";


function ShoppingCart() {
    const history = useHistory();

    const [storeItems, setStoreItems] = useState([]);
    const {cartItems} = useContext(CartContext);
    const cartQuantity = 1;

    const [isShown, setIsShown] = useState(false)

    useEffect(() => {

        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8080/products', {});
                console.log(response.data);
                setStoreItems(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchProducts();

    }, []);

    function decreaseCartQuantity() {
        return null;
    }


    function checkout() {
        history.push('/checkout');
    }

    return <>
        <div>
            <div className="shopping-cart-page">
                <h1 className="shopping-cart-h1">Winkelwagen</h1>
            </div>
            <div className="shopping-cart-container">
                <div className="inner-container">
                    <div className="container-shopping-cart">
                        {cartQuantity === 0 && (<div className="content-for-shopping-cart" id="shopping-cart">
                            <p className="click-to-shop"><BiMessageError size={30}/>&nbsp;Je winkelwagen is
                                momenteel leeg</p>
                            <div className="to-shop-link-container">
                                <p className="click-to-shop">
                                    Klik&nbsp;<span><NavLink to="/shop"
                                                             exact activeClassName="active-link"><FcShop
                                    className="shop-icon"
                                    size={25}/></NavLink></span>&nbsp;om terug te gaan de Loahy Shop
                                </p>
                            </div>
                        </div>)}
                        <div className="notice-wrapper">
                            <fieldset className="field-set-shopping-cart">
                                <form>
                                    <table className="shop-table-responsive-cart" cellSpacing="1">
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
                                            <td className="product-remove"><IoCloseSharp size={26}
                                                                                         onClick={decreaseCartQuantity}/>
                                            </td>
                                            <td className="product-thumbnail">{storeItems.image != null ? (storeItems.image) :
                                                <GrDocumentMissing size={30}/>}</td>
                                            <td className="product-name-name">{storeItems.productName}</td>
                                            <td className="product-price">{storeItems.productPrice}</td>
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
                            {cartQuantity !== 0 && (<div>
                                <button className="cart-checkout-button"
                                        onClick={checkout}>
                                    <IoBagCheckOutline size={22}/>&nbsp;Bestellen
                                </button>
                                <div className="to-shop-link-container">
                                    <p className="click-to-shop">
                                        Klik&nbsp;<span>
                                        <NavLink to="/shop"
                                                 onMouseEnter={() => setIsShown(true)}
                                                 onMouseLeave={() => setIsShown(false)}
                                                 exact activeClassName="active-link">
                                            <FcShop className="shop-icon"
                                                    size={25}/>
                                            {isShown && <p>hier</p>}
                                        </NavLink></span>&nbsp;om verder te winkelen
                                    </p>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

}


export default ShoppingCart;
