import React, {useContext} from "react";

import './NavBar.css';
import {NavLink} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";

import {HiOutlineHeart, HiOutlineShoppingCart, HiOutlineUser} from "react-icons/hi";
import {CartContext} from "../../context/CartContext";
import CartDropDown from "../../components/cartDropDownMenu/CartDropDown";


function NavBar() {
    const { state: {cart} } = useContext(CartContext);

    return (
        <div className="inner-container">
            <nav>
                <ul className="navbar-list-options">
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/#shop">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to="/#our-story">
                            Ons verhaal
                        </Link>
                    </li>
                    <li>
                        <Link to="/#contact-us">
                            Contact
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-list-icons">
                    <li>
                        <NavLink to="/shopping-cart" className="navbar-icon">
                            <span className="hover-icon">
                                <div><HiOutlineShoppingCart
                                    className="cart-icon"
                                    size={22}/>
                                </div>
                                <div className="dropdown-content">
                                    <div className="cart-component-background"><CartDropDown/></div>
                                </div>
                            </span>
                        </NavLink>
                        {cart.length > 0 && (<div className="rounded-circle">
                            {cart.length}
                        </div>)}
                    </li>
                    <li>
                        <NavLink to="/wishlist" className="navbar-icon">
                            <HiOutlineHeart
                                size={22}
                                className="wishlist-icon"
                            />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customer/login" className="navbar-icon">
                            <HiOutlineUser
                                size={22}
                                className="customer-icon"
                            />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>)

}

export default NavBar;