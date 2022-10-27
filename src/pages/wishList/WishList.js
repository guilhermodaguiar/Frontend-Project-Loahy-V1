import './WishList.css';
import {IoCloseSharp} from "react-icons/io5";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {NavLink, useHistory} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {BiMessageError} from "react-icons/bi";


function WishList() {
    const [item, setItem] = useState({});
    const [error, setError] = useState('');
    const {isAuth} = useContext(AuthContext);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getWishlistItems() {
            setError('')
            try {
                const response = axios.get(`https://localhost:8080/wishlists`, {
                    concelToken: source,
                });
                console.log((response.data.value))
                setItem(response.data.value)
            } catch (e) {
                console.error(e);
                setError('Er is iets misgegaan met het ophalen van de data. Probeer het nog eens');
            }
            getWishlistItems();

            //UNMOUNT
            return function cleanup() {
                console.log(`We gaan eraan!!`);
                source.cancel();
            }
        }
    }, []);


    return (
        <>
            <div className="wishlist-page">
                <h1 className="wishlist-h1">Wishlist</h1>
            </div>
            {isAuth ? (<>
                <div className="wishlist-body">
                    <div className="wishlist-info">
                        <p>Voeg items toe aan je verlanglijstje</p>
                    </div>
                    <div className="wishlist-inner-container">
                        <div></div>
                        <div className="wishlist-wishlist">
                            <div>
                                <h3>[costumer]'s Wishlist</h3>
                                <div>
                                    <table className="shop-table-responsive-cart" cellSpacing="0">
                                        <thead>
                                        <tr>
                                            <th className="product remove"></th>
                                            <th className="product-name-name">Product</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="form-cart-item">
                                            <td className="product remove"><IoCloseSharp/></td>
                                            <td className="product-name-name">hier komen de producten</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>) : (
                <div className="wishlist-outer-container">
                    <div>
                        <div className="warning-icon"><BiMessageError size={40}/></div>
                        <p className="click-to-shop"> Je moet ingelogd zijn om je Wishlist te zien en te updaten</p>
                        <p className="click-to-shop"> Klik&nbsp;
                            <NavLink to="/customer/register" exact activeClassName="active-link">
                                <p className="click-p">hier</p>
                            </NavLink>
                            &nbsp;om te registreren
                        </p>

                        <p className="click-to-shop"> Klik&nbsp;
                            <NavLink to="/customer/login" exact activeClassName="active-link"><p
                                className="click-p">hier</p></NavLink>
                            &nbsp;om in te loggen
                        </p>

                        <div className="to-shop-link-container">
                            <p className="click-to-shop">
                                Klik&nbsp;
                                <span>
                                        <NavLink to="/shop"
                                                 exact activeClassName="active-link">
                                            <FcShop className="shop-icon"
                                                    size={25}/>
                                        </NavLink>
                                </span>&nbsp;om verder te winkelen
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default WishList;