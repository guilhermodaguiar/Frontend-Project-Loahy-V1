import React, {useContext, useState} from "react";

import './NavBar.css';
import {NavLink} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";

import {HiOutlineHeart, HiOutlineShoppingCart, HiOutlineUser} from "react-icons/hi";
import {CartContext} from "../../context/CartContext";


function NavBar() {
    const {cartQuantity} = useContext(CartContext);


    return (<div className="inner-container">
        <nav>
            <ul className="navbar-list-options">
                <li>
                    <Link to="/" activeClassName="active-homepage">
                        Home
                    </Link>
                </li>
                <li>
                    <NavLink to="/shop" activeClassName="active-product-overview">
                        Shop
                    </NavLink>
                </li>
                <li>
                    <Link to="/#our-story" activeClassName="active-our-story">
                        Ons verhaal
                    </Link>
                </li>
                <li>
                    <Link to="/#contact-us" activeClassname="active-contact-us">
                        Contact
                    </Link>
                </li>
            </ul>
            <ul className="navbar-list-icons">
                <li>
                    <NavLink to="/shopping-cart" className="navbar-icon" activeClassName="active-shopping-cart">
                            <span className="hover-icon">
                                <HiOutlineShoppingCart
                                    className="cart-icon"
                                    size={22}
                                />
                            </span>

                    </NavLink>
                    {cartQuantity > 0 && (<div className="rounded-circle">
                        {cartQuantity}
                    </div>)}
                </li>
                <li>
                    <NavLink to="/wishlist" className="navbar-icon" activeClassName="active-wishlist-account">
                        <HiOutlineHeart
                            size={22}
                            className="wishlist-icon"
                        />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/customer" className="navbar-icon" activeClassName="active-customer-account">
                        <HiOutlineUser
                            size={22}
                            className="customer-icon"
                        /></NavLink>

                </li>
            </ul>
        </nav>
    </div>)

}

export default NavBar;