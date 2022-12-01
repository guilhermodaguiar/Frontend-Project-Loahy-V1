import './AdminPage.css';

import React, {useContext, useEffect, useState} from "react";
import AdminProfile from "../../components/adminProfile/AdminProfile";
import AdminAddProductComponent from "../../components/adminProductComponent/AdminProductComponent";
import AdminUpdateProductComponent from "../../components/adminUpdateProductComponent/AdminUpdateProductComponent";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";

import AdminUserComponent from "../../components/adminUserComponent/AdminUserComponent";
import AdminContactUsComponent from "../../components/adminContactUsComponent/AdminContactUsComponent";
import AdminOrderComponent from "../../components/adminOrderComponent/AdminOrderComponent";
import {AuthContext} from "../../context/AuthContext";
import AdminNavBar from "../../layout/adminNavBar/AdminNavBar";
import axios from "axios";
import AdminProductOverviewComponent
    from "../../components/adminProductOverviewComponent/AdminProductOverviewComponent";


function AdminPage() {

    const token = localStorage.getItem('token');
    const {user_email, logout} = useContext(AuthContext);
    const [adminData, setAdminData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:8080/users/${user_email}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setAdminData(response.data)

                if (response.data.authorities[0].authority === 'ROLE_ADMIN') {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e)
            }
        }

        fetchUserData();

    }, [token, user_email]);


    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    return (
        <>
            <div className="admin-header">
                <h1>Welcome Admin</h1>
            </div>
            <div className="admin-navbar-container">
                <AdminNavBar/>
            </div>
            <div className="admin-main">
                        <ScrollIndicator/>
                        <ScrollToTop/>
                        {/*<section id="admin-product-overview">*/}
                        {/*    <AdminProductOverviewComponent/>*/}
                        {/*</section>*/}
                        <section id="admin-add-new-product">
                            <AdminAddProductComponent/>
                        </section>
                        <section id="admin-new-products-update">
                            <AdminUpdateProductComponent/>
                        </section>
                        <section id="all-costumers">
                            <AdminUserComponent/>
                        </section>
                        <section id="all-orders">
                            <AdminOrderComponent/>
                        </section>
                        <section id="all-contact-remarks">
                            <AdminContactUsComponent/>
                        </section>
                        <div>
                            <button
                                className="logout-button"
                                    type="button"
                                    onClick={logout} >
                                Uitloggen
                            </button>
                        </div>
                    </div>
        </>
    )

}

// <div className="admin-route-container">
//     <div className="admin-route-container">
//         <div className="admin-route">
//             <h1>Moet ingelogd zijn als Admin</h1>
//         </div>
//     </div>
// </div>

export default AdminPage