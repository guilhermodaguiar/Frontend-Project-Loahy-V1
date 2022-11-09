import React, {useContext} from "react";

import './AdminPage.css';
import AdminProfile from "../../components/adminProfile/AdminProfile";
import AdminAddProductComponent from "../../components/adminProductComponent/AdminProductComponent";
import AdminProductOverviewComponent
    from "../../components/adminProductOverviewComponent/AdminProductOverviewComponent";
import AdminUpdateProductComponent from "../../components/adminUpdateProductComponent/AdminUpdateProductComponent";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";

import AdminUserComponent from "../../components/adminUserComponent/AdminUserComponent";
import AdminContactUsComponent from "../../components/adminContactUsComponent/AdminContactUsComponent";
import AdminOrderComponent from "../../components/adminOrderComponent/AdminOrderComponent";
import GreetUser from "../../components/greetUser/GreetUser";
import {AuthContext} from "../../context/AuthContext";
import AdminNavBar from "../../layout/adminNavBar/AdminNavBar";
import NavBar from "../../layout/navBar/NavBar";


function AdminPage() {

    const {user, logout} = useContext(AuthContext);


    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    return (
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                    <div className="admin-route-container">
                        <div className="admin-route-container">
                            <div className="admin-route">
                                <h1>Moet ingelogd zijn als Admin</h1>
                            </div>
                        </div>
                    </div>
                ) :
                (
                    <div className="admin-main">
                        <NavBar/>
                        <ScrollIndicator/>
                        <ScrollToTop/>

                        <div>
                            <AdminNavBar/>
                        </div>
                        <div className="container-greet-user">
                            <h1>Admin Profiel Pagina</h1>
                            <GreetUser/>
                        </div>
                        <section id="admin-profile">
                            <AdminProfile/>
                        </section>

                        {/*producten*/}
                        <section id="admin-product-overview">
                            <AdminProductOverviewComponent/>
                        </section>
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
                )}
        </>
    )

}

export default AdminPage