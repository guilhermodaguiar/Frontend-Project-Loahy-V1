import './WishList.css';
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {BiMessageError} from "react-icons/bi";
import {GrDocumentMissing} from "react-icons/gr";
import {WishlistContext} from "../../context/WishlistContext";
import {IoCloseSharp} from "react-icons/io5";


function WishList() {
    const {isAuth} = useContext(AuthContext);
    const {state2: {wishlist, wishlistItems}, dispatch2} = useContext(WishlistContext);

    return (
        <>
            <div className="wishlist-page">
                <h1 className="wishlist-h1">Wishlist</h1>
            </div>
            {wishlist.map((item) =>
                <div className="wishlist-outer-outer-container">
                    {!isAuth ? (
                        <div>
                            <div>
                                <div className="warning-icon"><BiMessageError size={40}/></div>
                                <p className="click-to-shop"> Je moet ingelogd zijn om je Wishlist te zien en te
                                    updaten</p>
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
                        <>
                            {wishlist.length > 0 ? (<div className="notice-wrapper">
                                <div className="shopping-cart-outer-container">
                                    <div className="shopping-cart-new-container">
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner"></div>
                                            <div className="cart-container-inner"
                                            >
                                                <button className="remove-from-cart-button">
                                                    <IoCloseSharp size={20} onClick={() => dispatch2({
                                                        type: 'REMOVE_FROM_WISHLIST',
                                                        payload: item,
                                                    })}/>
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner"></div>
                                            <div className="cart-container-inner">
                                                {wishlistItems.image != null ? (wishlistItems.image) :
                                                    <GrDocumentMissing size={30}/>}</div>
                                        </div>
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner">Naam</div>
                                            <div className="cart-container-inner"></div>
                                        </div>
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>) : (
                                <span>
                                    <div>
                                        <div className="warning-icon"><BiMessageError size={40}/></div>
                                        <p className="click-to-shop">Je wishlist is leeg</p>
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
                                </span>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default WishList;