import React, {useContext, useEffect, useState} from "react";

import './AdminPage.css';
import AdminProfile from "../../components/adminProfile/AdminProfile";
import AdminAddProductComponent from "../../components/adminProductComponent/AdminProductComponent";
import AdminProductOverviewComponent
    from "../../components/adminProductOverviewComponent/AdminProductOverviewComponent";
import AdminUpdateProductComponent from "../../components/adminUpdateProductComponent/AdminUpdateProductComponent";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import {HashLink as Link} from "react-router-hash-link";
import AdminUserComponent from "../../components/adminUserComponent/AdminUserComponent";
import AdminContactUsComponent from "../../components/adminContactUsComponent/AdminContactUsComponent";
import AdminAboutUsComponent from "../../components/adminAboutUsComponent/AdminAboutUsComponent";
import AdminOrderComponent from "../../components/adminOrderComponent/AdminOrderComponent";
import GreetUser from "../../components/greetUser/GreetUser";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";


function AdminPage() {

    const token = localStorage.getItem('token');
    const { user: {user_email}, logout } = useContext(AuthContext);

    const [isAdmin, setIsAdmin] = useState(false);
    const [adminInput, setAdminInput] = useState([]);

    useEffect(() => {

        async function fetchAdminData() {

            try {
                const response = await axios.get(`http://localhost:8080/users/${user_email}/`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setAdminInput(response.data)

                if (response.data.authorities[0].authority === 'ROLE_ADMIN') {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e);
            }
        }

        fetchAdminData();
    }, [isAdmin, token, user_email])

    return(
        <>
            { !isAdmin ? (
                    <div className="admin-route-container">
                        <div className="admin-route">
                            <h1>U moet ingelogd zijn als
                                <br/> ADMINISTRATOR
                                <br/>om deze content te mogen zien..
                            </h1>
                        </div>
                    </div>
            ) :
                (
                    <div>
                        <div className="inner-container">
                            <nav className="admin-nav">
                                <ul>
                                    <li>
                                        <Link to="/#admin-profile">
                                            Profiel
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/#admin-product-overview">
                                            Producten
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/#admin-add-new-product">
                                            Product toevoegen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/#admin-new-products-update">
                                            Producten updaten
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/#new-products-update">
                                            Producten bewerken
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/#all-costumers">
                                            Klanten
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/#all-orders">
                                            Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/#all-contact-remarks">
                                            Contact Opmerkingen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#admin-about-us">
                                            Over Ons
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="logout-button"
                                                type="button"
                                                onClick={logout} >

                                            Uitloggen

                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <ScrollIndicator/>
                        <ScrollToTop/>

                        <div className="container-greet-user">
                            <h1>Admin Profiel Pagina</h1>
                            <GreetUser/>
                        </div>
                        <section>
                            <AdminProfile/>
                        </section>
                        <section>
                            <AdminProductOverviewComponent/>
                        </section>
                        <section>
                            <AdminAddProductComponent/>
                        </section>
                        <section>
                            <AdminUpdateProductComponent/>
                        </section>


                        <section>
                            <AdminUserComponent/>
                        </section>
                        <section>
                            <AdminOrderComponent/>
                        </section>
                        <section>
                            <AdminContactUsComponent/>
                        </section>
                        <section>
                            <AdminAboutUsComponent/>
                        </section>
                    </div>
                )}
        </>
    )

}

export default AdminPage