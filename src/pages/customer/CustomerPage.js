import React, {useContext, useEffect, useState} from "react";

import './CostumorPage.css';
import CustomerProfile from "../../components/customerProfile/CustomerProfile";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import NavBar from "../../layout/navBar/NavBar";
import {AuthContext} from "../../context/AuthContext";
import {HashLink as Link} from "react-router-hash-link";
import Cart from "../cart/Cart";
import WishList from "../wishList/WishList";
import {useHistory} from "react-router-dom";
import axios from "axios";


function CustomerPage() {
    const history = useHistory();

    const token = localStorage.getItem('token');
    const { user: {user_email}, logout } = useContext(AuthContext);

    const[isCustomer, setIsCustomer] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();
        async function fetchUserData() {
            try {
                const response = await axios.get (`http://localhost:8080/users/${user_email}/`,
                    {
                        cancelToken: source.token,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                    );
            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e)
            }
        }
        fetchUserData();
        return function cleanUp() {
            source.cancel();
        }

    }, [token, user_email]);


    return(
        <>
            <NavBar/>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/#customer/profile">
                                Profiel
                            </Link>
                        </li>
                        <li>
                            <Link to="#/customer/shopping-cart">
                                Winkelwagen
                            </Link>
                        </li>
                        <li>
                            <Link to="#wishlist">
                                verlanglijstje
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <button className="logout-button"
                    type="button"
                    onClick={logout} >
                Uitloggen
            </button>
            <ScrollIndicator/>
            <ScrollToTop/>
            <CustomerProfile/>
            <Cart/>
            <WishList/>
        </>
    )

}

export default CustomerPage;