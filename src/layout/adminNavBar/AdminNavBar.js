import './AdminNavBar.css';

import React, {useContext} from "react";
import {HashLink as Link} from "react-router-hash-link";
import {AuthContext} from "../../context/AuthContext";

function AdminNavBar() {
const {logout} = useContext(AuthContext);

    return(
        <>
            <section className="admin-nav-bar-outer-container">
                <div className="admin-nav-bar-inner-container">
                    <div className="container-for-padding">
                        <Link to="/#admin-product-overview">
                            Mijn producten
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/#admin-add-new-product">
                            Product aanpassen
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/#all-costumers">
                            Klanten
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/#all-orders">
                            Orders
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/#all-contact-remarks">
                            Contact Opmerkingen
                        </Link>
                    </div>
                    <div className="container-for-button">
                        <button className="logout-button"
                                type="button"
                                onClick={logout} >
                            Uitloggen
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}


export default AdminNavBar;

