import React, {useContext, useEffect, useState} from "react";

import "./CustomerProfile.css";
import NavBar from "../../layout/navBar/NavBar";
import GreetUser from "../greetUser/GreetUser";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useHistory} from "react-router-dom";
import UserProfile from "../userProfile/UserProfile";
import Cart from "../../pages/cart/Cart";
import WishList from "../../pages/wishList/WishList";
import UserInfoForm from "../userInfoForm/UserInfoForm";



function CustomerProfile() {
    const history = useHistory();

    const token = localStorage.getItem('token');
    const {user: {userEmail}} = useContext(AuthContext);

    const [userData, setUserData] = useState({});
    const { user } = useContext(AuthContext);


    useEffect(() =>{
        async function fetchProfileData() {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8080/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data)
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfileData();

        return function cleanup() {
            token.cancel();
        }
    }, [token])

    return(
        <>
            <div>
                <section>
                    <GreetUser/>
                </section>
                <section>
                    <UserProfile/>
                </section>
                <section>
                    <UserInfoForm/>
                </section>
                <section>
                    <Cart/>
                </section>
                <section>
                    <WishList/>
                </section>
                <section>
                    <button type="button" onClick={user.logout}>
                        Uitloggen
                    </button>
                </section>
            </div>
        </>
    )
}

export default CustomerProfile;