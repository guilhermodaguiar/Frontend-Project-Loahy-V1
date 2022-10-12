import React, {useContext, useEffect, useState} from "react";

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
import AdminAboutUsComponent from "../../components/adminAboutUsComponent/AdminAboutUsComponent";
import AdminOrderComponent from "../../components/adminOrderComponent/AdminOrderComponent";
import GreetUser from "../../components/greetUser/GreetUser";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import AdminNavBar from "../../layout/adminNavBar/AdminNavBar";


function AdminPage() {


    const token = localStorage.getItem('token');
    const { user: { user_email }, logout } = useContext(AuthContext);

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
                setAdminInput(response.data);

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
    }, [isAdmin, token, user_email]);

    window.scrollTo({
        top:0,
        behavior: 'smooth'
    });

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
                    <div className="admin-main">

                        <ScrollIndicator/>
                        <ScrollToTop/>

                        <div>
                            <AdminNavBar/>
                        </div>
                        <div className="container-greet-user">
                            <h1>Admin Profiel Pagina</h1>
                            <GreetUser/>
                        </div>
                        <section>
                            <AdminProfile/>
                        </section>

                        {/*producten*/}
                        <section>
                            <AdminProductOverviewComponent/>
                        </section>
                        <section>
                            <AdminAddProductComponent/>
                        </section>
                        <section>
                            <AdminUpdateProductComponent/>
                        </section>

                        {/*andere componenten*/}
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