import './WishList.css';
import {IoCloseSharp} from "react-icons/io5";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {BiMessageError} from "react-icons/bi";
import {WishlistContext} from "../../context/WishlistContext";
import {GrDocumentMissing} from "react-icons/gr";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";


function WishList() {
    const {
        listQuantity,
        increaseListQuantity,
        decreaseListQuantity,
        removeFromList
    } = useContext(WishlistContext);
    const [listItems, setListItems] = useState([])
    const {isAuth} = useContext(AuthContext);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getWishlistItems() {
            try {
                const response = axios.get(`https://localhost:8080/wishlists`, {
                    concelToken: source,
                });
                console.log((response.data.value))
                setListItems(response.data.value)
            } catch (e) {
                console.error(e);
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
            <div className="wishlist-outer-outer-container">
                {/*Vergeet niet hier de listQuantity over isAuth te veranderen*/}
                {/* isAuth ?*/}
                {listQuantity === 0 ? (
                    <div>
                        <div>
                            <div className="warning-icon"><BiMessageError size={40}/></div>
                            <p className="click-to-shop"> Je moet ingelogd zijn om je Wishlist te zien en te updaten</p>
                            <p className="click-to-shop"> Klik&nbsp;
                                <NavLink to="/customer/register">
                                    <p className="click-p">hier</p>
                                </NavLink>
                                &nbsp;om te registreren
                            </p>

                            <p className="click-to-shop"> Klik&nbsp;
                                <NavLink to="/customer"><p
                                    className="click-p">hier</p></NavLink>
                                &nbsp;om in te loggen
                            </p>

                            <div className="to-shop-link-container">
                                <p className="click-to-shop">
                                    Klik&nbsp;
                                    <span>
                                        <NavLink to="/shop">
                                            <FcShop className="shop-icon"
                                                    size={25}/>
                                        </NavLink>
                                </span>&nbsp;om verder te winkelen
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="notice-wrapper">
                        <div className="shopping-cart-outer-container">
                            <div className="shopping-cart-new-container">
                                <div className="cart-container-outer">
                                    <div className="cart-container-inner"></div>
                                    <div className="cart-container-inner"
                                    >
                                        <button className="remove-from-cart-button">
                                            <IoCloseSharp size={20}
                                                          onClick={removeFromList}/>
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-container-outer">
                                    <div className="cart-container-inner"></div>
                                    <div className="cart-container-inner">
                                        {listItems.image != null ? (listItems.image) :
                                            <GrDocumentMissing size={30}/>}</div>
                                </div>
                                <div className="cart-container-outer">
                                    <div className="cart-container-inner">Naam</div>
                                    <div className="cart-container-inner"></div>
                                </div>
                                <div className="cart-container-outer">
                                    <div className="cart-container-inner">Prijs</div>
                                    <div className="cart-container-inner"></div>
                                </div>
                                <div className="cart-container-outer">
                                    <div className="cart-container-inner"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default WishList;