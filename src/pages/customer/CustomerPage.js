import React, {useContext, useEffect, useState} from "react";

import './CostumorPage.css';
import CustomerProfile from "../../components/customerProfile/CustomerProfile";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import {AuthContext} from "../../context/AuthContext";
import {HashLink as Link} from "react-router-hash-link";
import axios from "axios";
import NavBar from "../../layout/navBar/NavBar";


function CustomerPage() {
    const token = localStorage.getItem('token');
    const {user: {user_email}, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {

        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:8080/users/${user_email}/`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setUserData(response.data)
                console.log(response);

                if (response.data.authorities.authority === 'ROLE_USER') {
                    setIsUser(true)
                } else {
                    setIsUser(false)
                }
            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e)
            }
        }

        fetchUserData();

    }, []);


    return (
        <>
            <div>
                <NavBar/>
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
                    onClick={logout}>
                Uitloggen
            </button>
            <ScrollIndicator/>
            <ScrollToTop/>
            <CustomerProfile/>
        </>
    )

}

export default CustomerPage;