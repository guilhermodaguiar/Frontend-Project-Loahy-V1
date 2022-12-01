import './WishList.css';
import React, {useContext, useState} from "react";
import WishlistComponent from "./WishlistComponent";
import {useDispatchWishlist, useWishlist} from "../../context/WishlistContext";
import {NavLink} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";
import {BiMessageError} from "react-icons/bi";
import {FcShop} from "react-icons/fc";
import axios from "axios";
import {BsBookmarkHeart} from "react-icons/bs";
import {AuthContext} from "../../context/AuthContext";


function WishList() {
    const {isAuth} = useContext(AuthContext);
    const wishlistItems = useWishlist();
    const dispatch3 = useDispatchWishlist();
    const [loading, toggleLoading] = useState(false);
    const [addSucces, toggleAddSucces] = useState(false);
    const [wishlistInput, setWishlistInput] = useState([]);
    const [productListLong, setProductListLong] = useState([])

    console.log(wishlistItems);
    console.log(isAuth);

    const handleRemove = (index) => {
        dispatch3({type: "REMOVE_FROM_WISHLIST", index});
    };

    async function handleSaveWishlist(e) {
        e.preventDefault(e);
        toggleLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/wishlists/save',
                {
                    productList: productListLong,

                });
            setWishlistInput(response.data);
            toggleAddSucces(true);

        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
        toggleLoading(false);
    }

    return (
        <>
            <div className="wishlist-page">
                <h1 className="wishlist-h1">Wishlist</h1>
            </div>
            <div className="wishlist-outer-outer-container">
                {!isAuth ? (
                    <div>
                        <div>
                            <div className="warning-icon"><BiMessageError size={40}/></div>
                            <div className="click-to-shop">
                                <p>Je moet ingelogd zijn om je Wishlist te zien en te
                                    updaten</p>
                            </div>
                            <div className="click-to-shop"> Klik&nbsp;
                                <NavLink to="/customer/register">
                                    <div className="click-p">hier</div>
                                </NavLink>
                                &nbsp;om te registreren
                            </div>

                            <div className="click-to-shop"> Klik&nbsp;
                                <NavLink to="/customer/login"><div
                                    className="click-p">hier</div></NavLink>
                                &nbsp;om in te loggen
                            </div>

                            <div className="to-shop-link-container">
                                <div className="click-to-shop">
                                    Klik&nbsp;
                                    <span>
                                        <Link to="/#shop">
                                            <FcShop className="shop-icon"
                                                    size={25}/>
                                        </Link>
                                    </span>&nbsp;om verder te winkelen
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="wishlist-outer-outer-container">
                        {wishlistItems.map((item, index) => {
                            return <WishlistComponent
                                key={index}
                                index={index}
                                handleRemove={handleRemove}
                                item={item}
                            />
                        })}
                        <div className="wishlist-outer-outer-container">
                            <div>
                                {wishlistItems.length > 0 ? (
                                    <button className="cart-checkout-button"
                                                                     onClick={handleSaveWishlist}
                                                                     disabled={loading}>
                                    <BsBookmarkHeart size={22}/>&nbsp;<p>Opslaan</p>
                                    </button>) : (<span>
                                <div>
                                    <div className="warning-icon"><BiMessageError size={40}/></div>
                                    <p className="click-to-shop">Je wishlist is leeg</p>
                                    <div className="to-shop-link-container">
                                        <div className="click-to-shop">
                                            Klik&nbsp;
                                            <span>
                                                <Link to="/#shop">
                                                    <FcShop className="shop-icon"
                                                            size={25}/>
                                                </Link>
                                            </span>
                                            &nbsp;om verder te winkelen
                                        </div>
                                    </div>
                                </div>
                            </span>)}
                            </div>
                            {addSucces === true &&
                                <p>Wishlist is opgeslagen</p>}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default WishList;