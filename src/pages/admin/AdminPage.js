import './AdminPage.css';

import React, {useContext} from "react";
import AdminUpdateProduct from "../../components/adminUpdateProduct/AdminUpdateProduct";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import {AuthContext} from "../../context/AuthContext";
import AdminNavBar from "../../layout/adminNavBar/AdminNavBar";
import AdminProductOverview from "../../components/adminProductOverview/AdminProductOverview";
import AdminUser from "../../components/adminUser/AdminUser";
import AdminContactUs from "../../components/adminContactUs/AdminContactUs";


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
                    <div className="admin-route">
                        <h1>U moet ingelogd zijn als
                            <br/> ADMINISTRATOR
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
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
                        <section id="admin-product-overview">
                            <AdminProductOverview/>
                        </section>
                        {/*<section id="admin-add-new-product">*/}
                        {/*    <AdminAddProductComponent/>*/}
                        {/*</section>*/}
                        <section id="admin-new-products-update">
                            <AdminUpdateProduct/>
                        </section>
                        <section id="all-costumers">
                            <AdminUser/>
                        </section>
                        {/*<section id="all-orders">*/}
                        {/*    <AdminOrder/>*/}
                        {/*</section>*/}
                        <section id="all-contact-remarks">
                            <AdminContactUs/>
                        </section>
                        <div>
                            <button
                                className="logout-button"
                                type="button"
                                onClick={logout}>
                                Uitloggen
                            </button>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}


export default AdminPage