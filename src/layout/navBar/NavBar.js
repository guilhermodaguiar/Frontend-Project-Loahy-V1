import React from "react";

import './NavBar.css';
import {NavLink} from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

import { HiOutlineHeart, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";

function NavBar() {

    return(
        <div className="inner-container">
            <nav>
                <ul>
                    <li>
                        <Link to="/" activeClassName="active-homepage" >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/#products" activeClassName="active-product-overview">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to="/#our-story" activeClassName="active-our-story">
                         Ons verhaal
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-list-icons">
                    <li>
                        <NavLink to="/shopping-cart"  className="navbar-icon" activeClassName="active-shopping-cart">
                            <HiOutlineShoppingCart size={22}/></NavLink>
                    </li>
                    <li>
                        <NavLink to="/costumer" className="navbar-icon" activeClassName="active-wishlist-account">
                            <HiOutlineHeart size={22}/></NavLink>
                    </li>
                    <li>
                        <NavLink to="/costumer" className="navbar-icon" activeClassName="active-customer-account">
                            <HiOutlineUser size={22}/></NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default NavBar;